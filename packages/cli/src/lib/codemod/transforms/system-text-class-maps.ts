import MagicString from 'magic-string';
import { type AnyNode, lastImportEnd, walk } from '../../tsx-ast.js';
import { MARIGOLD_SYSTEM } from '../anchor.js';
import { parseOr } from '../engine.js';
import type { Codemod } from '../types.js';

// v19 (DST-1869): `@marigold/system` no longer exports the deprecated
// `fontWeight` and `textSize` class maps. The import becomes a local copy under
// the same name, so every use, shadowed or not, resolves exactly as before.
// Lookups are deliberately not inlined: that needs scope analysis to be safe.

// Copied from the v18 source: https://github.com/marigold-ui/marigold/blob/52883550fb014cd7ea95478ff5994e216da10725/packages/system/src/style-props.tsx#L521-L551
const MAPS: Record<string, Record<string, string>> = {
  fontWeight: {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  },
  textSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
  },
};

const MAP_NAME = /\b(fontWeight|textSize)\b/;
// a barrel never names the maps, so the quick filter has to let it through
const EXPORT_ALL = /\bexport\s*\*\s*from\b/;
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

const nameOf = (n: unknown) => (n as { name?: string } | undefined)?.name;
const sourceOf = (n: AnyNode) =>
  (n.source as AnyNode | null | undefined)?.value;

// `as const` keeps the v18 literal types, but is a syntax error in a JS file
const localCopy = (
  local: string,
  map: Record<string, string>,
  q: string,
  ts: boolean
) => {
  const entries = Object.entries(map).map(([key, value]) => {
    const k = IDENTIFIER.test(key) ? key : `${q}${key}${q}`;
    return `  ${k}: ${q}${value}${q},`;
  });
  return `const ${local} = {\n${entries.join('\n')}\n}${ts ? ' as const' : ''};`;
};

const removedWarning = (usage: string, name: string) =>
  `\`${usage}\`: v19 no longer exports \`${name}\`. Use the \`${name === 'fontWeight' ? 'weight' : 'fontSize'}\` prop on \`<Text>\`, or the Tailwind class directly`;

export const systemTextClassMaps: Codemod = {
  name: 'system-text-class-maps',
  description:
    'copy the removed `fontWeight`/`textSize` maps from @marigold/system into the files that import them',
  apply: (source, path) => {
    if (
      !source.includes(MARIGOLD_SYSTEM) ||
      !(MAP_NAME.test(source) || EXPORT_ALL.test(source))
    ) {
      return { kind: 'unchanged', warnings: [] };
    }
    return parseOr(source, file => {
      const body = (file.program as AnyNode).body as AnyNode[];
      const locals = new Map<string, string>(); // local name -> map name
      const drops = new Map<AnyNode, Set<AnyNode>>(); // decl -> specifiers
      const namespaces = new Set<string>(); // `import * as system`
      const warnings: string[] = [];
      let quote = "'";

      // imports and `export … from` are top-level only
      for (const n of body) {
        if (sourceOf(n) !== MARIGOLD_SYSTEM) continue;
        if (n.type === 'ExportAllDeclaration') {
          warnings.push(
            `\`export * from '${MARIGOLD_SYSTEM}'\`: v19 no longer exports \`fontWeight\` or \`textSize\`, so files that import them through this one break. Use the \`weight\` or \`fontSize\` prop on \`<Text>\`, or the Tailwind class directly`
          );
          continue;
        }
        for (const spec of (n.specifiers as AnyNode[] | undefined) ?? []) {
          if (n.type === 'ExportNamedDeclaration') {
            const name = nameOf(spec.local);
            if (name && MAPS[name]) {
              warnings.push(
                removedWarning(
                  `export { ${name} } from '${MARIGOLD_SYSTEM}'`,
                  name
                )
              );
            }
            continue;
          }
          if (spec.type === 'ImportNamespaceSpecifier') {
            const ns = nameOf(spec.local);
            if (ns) namespaces.add(ns);
            continue;
          }
          const imported = nameOf(spec.imported);
          if (spec.type !== 'ImportSpecifier' || !imported || !MAPS[imported]) {
            continue;
          }
          locals.set(nameOf(spec.local) ?? imported, imported);
          drops.set(n, (drops.get(n) ?? new Set()).add(spec));
          quote = source[(n.source as AnyNode).start as number] ?? quote;
        }
      }

      if (locals.size === 0 && namespaces.size === 0) {
        return { kind: 'unchanged', warnings };
      }

      const namespaceUses = new Map<string, string>(); // usage -> map name
      let syntaxTs = false;
      walk(file, n => {
        if (n.type.startsWith('TS') || n.importKind === 'type') syntaxTs = true;
        if (
          n.type === 'MemberExpression' ||
          n.type === 'OptionalMemberExpression'
        ) {
          const ns = nameOf(n.object);
          const property = n.property as AnyNode;
          // `system.fontWeight` or `system['fontWeight']`
          const name = n.computed
            ? property.type === 'StringLiteral'
              ? (property.value as string)
              : undefined
            : nameOf(property);
          if (ns && namespaces.has(ns) && name && MAPS[name]) {
            const usage = n.computed ? `${ns}['${name}']` : `${ns}.${name}`;
            namespaceUses.set(usage, name);
          }
        }
        // `const { fontWeight } = system`
        if (
          n.type === 'VariableDeclarator' &&
          (n.id as AnyNode).type === 'ObjectPattern'
        ) {
          const ns = nameOf(n.init);
          if (!ns || !namespaces.has(ns)) return;
          for (const prop of (n.id as AnyNode).properties as AnyNode[]) {
            const name = prop.computed ? undefined : nameOf(prop.key);
            if (name && MAPS[name]) {
              namespaceUses.set(`const { ${name} } = ${ns}`, name);
            }
          }
        }
      });

      for (const [usage, name] of namespaceUses) {
        warnings.push(removedWarning(usage, name));
      }
      if (locals.size === 0) {
        return { kind: 'unchanged', warnings };
      }

      // the extension decides when known: a .tsx file may hold no TS syntax
      const ts = path ? /\.[cm]?tsx?$/.test(path) : syntaxTs;
      const s = new MagicString(source);
      const changes: string[] = [];
      const copies: string[] = [];
      for (const [local, mapName] of locals) {
        copies.push(localCopy(local, MAPS[mapName], quote, ts));
        changes.push(
          `${MARIGOLD_SYSTEM}: \`${mapName}\` is no longer exported, copied it into this file as \`${local}\``
        );
      }

      const emptied = new Set<AnyNode>();
      for (const [decl, drop] of drops) {
        const specs = decl.specifiers as AnyNode[];
        if (drop.size === specs.length) {
          emptied.add(decl);
          const end = decl.end as number;
          s.remove(decl.start as number, source[end] === '\n' ? end + 1 : end);
          continue;
        }
        let prevKept: AnyNode | undefined;
        specs.forEach((spec, i) => {
          if (!drop.has(spec)) {
            prevKept = spec;
            return;
          }
          const next = specs[i + 1];
          // trailing: remove back to the last kept specifier, comma included
          if (next) s.remove(spec.start as number, next.start as number);
          else s.remove(prevKept!.end as number, spec.end as number);
        });
      }

      const block = `// removed from @marigold/system in v19\n${copies.join('\n\n')}`;
      // before the first statement that is not an import, so no use precedes it
      const firstCode = body.findIndex(n => n.type !== 'ImportDeclaration');
      const leading = firstCode === -1 ? body : body.slice(0, firstCode);
      const kept = leading.filter(decl => !emptied.has(decl));
      if (kept.length > 0) {
        s.appendRight(lastImportEnd(kept), `\n\n${block}`);
      } else {
        // a removed import leaves its blank line behind
        const gap = emptied.has(body[0]) ? '\n' : '\n\n';
        s.appendLeft(body[0].start as number, `${block}${gap}`);
      }

      // keep a blank line between the copies and the code that follows them
      let output = s.toString();
      const after = output.indexOf(block) + block.length;
      if (output[after] === '\n' && /[^\r\n]/.test(output[after + 1] ?? '\n')) {
        output = `${output.slice(0, after)}\n${output.slice(after)}`;
      }

      return { kind: 'edited', output, changes, warnings };
    });
  },
};
