import MagicString from 'magic-string';
import { type AnyNode, jsxOpeningName, walk } from '../../tsx-ast.js';
import { MARIGOLD_SYSTEM } from '../anchor.js';
import { parseOr } from '../engine.js';
import { attrName, jsxAttributes, jsxElements } from '../primitives/jsx.js';
import type { Codemod } from '../types.js';

// v19 (DST-1393): `@marigold/system` no longer exports `<SVG>` or `SVGProps`.
// Each `<SVG>` becomes a native `<svg>` that renders the same:
// - `size` (default 24) becomes `width`/`height`, which is what `<SVG>` set,
//   so a size class in `className` still wins exactly as before
// - `color` becomes a `text-*` class, which is what `ensureCssVar` resolved to
// - `flex-none fill-current`, the classes `<SVG>` always added, go first in
//   `className` unless the consumer's own classes already decide fill or flex
// Anything that cannot be read statically is reported, never guessed at.

const SVG_NAME = /\bSVG(Props)?\b/;
const EXPORT_ALL = /\bexport\s*\*\s*from\b/;
// what `isValidCssCustomPropertyName` accepted, i.e. a theme color token
const TOKEN = /^[A-Za-z0-9_-]+$/;
const DEFAULT_SIZE = '24';

const nameOf = (n: unknown) => (n as { name?: string } | undefined)?.name;
const sourceOf = (n: AnyNode) =>
  (n.source as AnyNode | null | undefined)?.value;

/** a string literal, bare or in `{'…'}`, or null */
const staticString = (value: AnyNode | undefined): string | null => {
  const node =
    value?.type === 'JSXExpressionContainer'
      ? (value.expression as AnyNode | undefined)
      : value;
  if (node?.type === 'StringLiteral') return node.value as string;
  if (
    node?.type === 'TemplateLiteral' &&
    (node.expressions as AnyNode[]).length === 0
  ) {
    const [quasi] = node.quasis as AnyNode[];
    return (quasi.value as { cooked?: string }).cooked ?? null;
  }
  return null;
};

/** the class `<SVG>`'s `color` resolved to, or null when there is none */
const colorClass = (color: string): string | null => {
  if (color === 'currentColor' || color === 'currentcolor') return null;
  if (TOKEN.test(color)) return `text-${color}`;
  return `text-[${color.replace(/\s+/g, '_')}]`;
};

const BASE = ['flex-none', 'fill-current'];

/** `<SVG>`'s own classes, minus those the consumer's classes already decide */
const baseClasses = (own: string) => {
  const classes = own.split(/\s+/).filter(Boolean);
  const has = (re: RegExp) => classes.some(c => re.test(c));
  return BASE.filter(c =>
    c === 'fill-current'
      ? !has(/(^|:)fill-/)
      : !has(/(^|:)(flex-(none|auto|initial|1)|shrink)/)
  );
};

export const systemSvg: Codemod = {
  name: 'system-svg',
  description: 'replace the removed `<SVG>` from @marigold/system with `<svg>`',
  apply: source => {
    if (
      !source.includes(MARIGOLD_SYSTEM) ||
      !(SVG_NAME.test(source) || EXPORT_ALL.test(source))
    ) {
      return { kind: 'unchanged', warnings: [] };
    }
    return parseOr(source, file => {
      const body = (file.program as AnyNode).body as AnyNode[];
      const warnings: string[] = [];
      const changes: string[] = [];
      let local: string | null = null;
      let svgImport: { decl: AnyNode; spec: AnyNode } | null = null;
      const namespaces = new Set<string>();

      for (const n of body) {
        if (sourceOf(n) !== MARIGOLD_SYSTEM) continue;
        if (n.type === 'ExportAllDeclaration') {
          warnings.push(
            `\`export * from '${MARIGOLD_SYSTEM}'\`: v19 no longer exports \`SVG\` or \`SVGProps\`, so files that import them through this one break. Use a native \`<svg>\``
          );
          continue;
        }
        for (const spec of (n.specifiers as AnyNode[] | undefined) ?? []) {
          if (spec.type === 'ImportNamespaceSpecifier') {
            const ns = nameOf(spec.local);
            if (ns) namespaces.add(ns);
            continue;
          }
          const name =
            n.type === 'ExportNamedDeclaration'
              ? nameOf(spec.local)
              : nameOf(spec.imported);
          if (name !== 'SVG' && name !== 'SVGProps') continue;
          if (n.type === 'ExportNamedDeclaration') {
            warnings.push(
              `\`export { ${name} } from '${MARIGOLD_SYSTEM}'\`: v19 no longer exports \`${name}\`. Use a native \`<svg>\``
            );
            continue;
          }
          if (name === 'SVGProps') {
            warnings.push(
              `\`SVGProps\` from ${MARIGOLD_SYSTEM} is removed in v19. Use \`ComponentProps<'svg'>\` from React`
            );
            continue;
          }
          local = nameOf(spec.local) ?? 'SVG';
          svgImport = { decl: n, spec };
        }
      }

      // `system.SVG` or `<system.SVG>`: report, the namespace import stays
      if (namespaces.size > 0) {
        walk(file, n => {
          const isMember =
            n.type === 'MemberExpression' || n.type === 'JSXMemberExpression';
          if (!isMember) return;
          const ns = nameOf(n.object);
          if (ns && namespaces.has(ns) && nameOf(n.property) === 'SVG') {
            warnings.push(
              `\`${ns}.SVG\`: v19 no longer exports \`SVG\` from ${MARIGOLD_SYSTEM}. Use a native \`<svg>\``
            );
          }
        });
      }

      if (!local || !svgImport) {
        return { kind: 'unchanged', warnings: [...new Set(warnings)] };
      }

      const s = new MagicString(source);
      let rewritten = 0;

      for (const el of jsxElements(file)) {
        if (jsxOpeningName(el) !== local) continue;
        const opening = el.openingElement as AnyNode;
        const closing = el.closingElement as AnyNode | null;
        const openName = opening.name as AnyNode;
        s.overwrite(openName.start as number, openName.end as number, 'svg');
        if (closing) {
          const closeName = closing.name as AnyNode;
          s.overwrite(
            closeName.start as number,
            closeName.end as number,
            'svg'
          );
        }

        const attrs = jsxAttributes(opening);
        const find = (name: string) => attrs.find(a => attrName(a) === name);
        const sizeAttr = find('size');
        const colorAttr = find('color');
        const classAttr = find('className');
        const hasWidth = !!find('width');
        const hasHeight = !!find('height');
        const spread = (opening.attributes as AnyNode[]).some(
          a => a.type === 'JSXSpreadAttribute'
        );
        if (spread) {
          warnings.push(
            `<${local}> with spread props: if they carry \`size\` or \`color\`, set \`width\`/\`height\` and a \`text-*\` class on the \`<svg>\` instead, they are not SVG attributes`
          );
        }

        // size -> width/height, for the dimensions not set explicitly
        const sizeValue = sizeAttr?.value
          ? source.slice(
              (sizeAttr.value as AnyNode).start as number,
              (sizeAttr.value as AnyNode).end as number
            )
          : `{${DEFAULT_SIZE}}`;
        const dims = [
          hasWidth ? null : `width=${sizeValue}`,
          hasHeight ? null : `height=${sizeValue}`,
        ]
          .filter(Boolean)
          .join(' ');
        if (sizeAttr) {
          if (dims) {
            s.overwrite(sizeAttr.start as number, sizeAttr.end as number, dims);
          } else {
            const end = sizeAttr.end as number;
            s.remove(
              sizeAttr.start as number,
              source[end] === ' ' ? end + 1 : end
            );
          }
        } else if (dims) {
          s.appendLeft(openName.end as number, ` ${dims}`);
        }

        // color -> text-* class
        let extra: string | null = null;
        if (colorAttr) {
          const color = staticString(colorAttr.value as AnyNode | undefined);
          if (color === null) {
            warnings.push(
              `<${local} color={…}>: the color is not a string literal, so it moved to \`style\`. A theme token like \`destructive-accent\` needs \`var(--color-destructive-accent)\` there, or a \`text-*\` class`
            );
            const expr = (colorAttr.value as AnyNode).expression as AnyNode;
            s.overwrite(
              colorAttr.start as number,
              colorAttr.end as number,
              `style={{ color: ${source.slice(expr.start as number, expr.end as number)} }}`
            );
          } else {
            extra = colorClass(color);
            const end = colorAttr.end as number;
            s.remove(
              colorAttr.start as number,
              source[end] === ' ' ? end + 1 : end
            );
          }
        }

        // className: <SVG>'s own classes first, as `cn('flex-none fill-current', className)` did
        const own = classAttr
          ? staticString(classAttr.value as AnyNode | undefined)
          : '';
        if (own === null) {
          const expr = (classAttr!.value as AnyNode).expression as AnyNode;
          const prefix = [...BASE, extra].filter(Boolean).join(' ');
          warnings.push(
            `<${local} className={…}>: \`<SVG>\` merged its classes with twMerge. Check that \`${prefix}\` does not conflict with the classes in the expression`
          );
          s.overwrite(
            classAttr!.start as number,
            classAttr!.end as number,
            `className={\`${prefix} \${${source.slice(expr.start as number, expr.end as number)}}\`}`
          );
        } else {
          const classes = [...baseClasses(own), extra, own]
            .filter(Boolean)
            .join(' ');
          if (classAttr) {
            const q = source[(classAttr.value as AnyNode).start as number];
            const quote = q === "'" || q === '"' ? q : '"';
            s.overwrite(
              (classAttr.value as AnyNode).start as number,
              (classAttr.value as AnyNode).end as number,
              `${quote}${classes}${quote}`
            );
          } else {
            s.appendLeft(openName.end as number, ` className="${classes}"`);
          }
        }

        rewritten++;
        changes.push(
          `<${local}> from ${MARIGOLD_SYSTEM} is removed in v19, replaced it with \`<svg>\``
        );
      }

      // any other reference (`as={SVG}`, `const Icon = SVG`) keeps the import
      const spec = svgImport.spec;
      const inSpec = (n: AnyNode) =>
        (n.start as number) >= (spec.start as number) &&
        (n.end as number) <= (spec.end as number);
      let otherUses = 0;
      walk(file, n => {
        if (n.type === 'Identifier' && n.name === local && !inSpec(n)) {
          otherUses++;
        }
      });

      if (otherUses > 0) {
        warnings.push(
          `\`${local}\` is used as a value, not only as JSX. v19 no longer exports it from ${MARIGOLD_SYSTEM}. Use a native \`<svg>\` there`
        );
      } else {
        const { decl } = svgImport;
        const specs = decl.specifiers as AnyNode[];
        if (specs.length === 1) {
          const end = decl.end as number;
          s.remove(decl.start as number, source[end] === '\n' ? end + 1 : end);
        } else {
          const i = specs.indexOf(spec);
          const next = specs[i + 1];
          if (next) s.remove(spec.start as number, next.start as number);
          else s.remove(specs[i - 1].end as number, spec.end as number);
        }
        changes.push(`removed the \`SVG\` import from ${MARIGOLD_SYSTEM}`);
      }

      const unique = [...new Set(warnings)];
      if (rewritten === 0 && otherUses > 0) {
        return { kind: 'unchanged', warnings: unique };
      }
      return {
        kind: 'edited',
        output: s.toString(),
        changes: [...new Set(changes)],
        warnings: unique,
      };
    });
  },
};
