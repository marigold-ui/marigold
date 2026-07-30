import MagicString from 'magic-string';
import {
  type AnyNode,
  collectImports,
  jsxOpeningName,
  walk,
} from '../../tsx-ast.js';
import { MARIGOLD_COMPONENTS, MARIGOLD_SYSTEM } from '../anchor.js';
import { parseOr } from '../engine.js';
import type { Codemod, CodemodOutcome, MigrationManifest } from '../types.js';

// Safe application-code transforms. The anchor is the import: a JSX element
// only counts as a Marigold component when its (possibly aliased) name is
// verifiably imported from @marigold/components. Only explicit JSX attributes
// are touched; props hidden behind spreads are out of reach by design, and
// the consumer's typecheck catches whatever we cannot see.

const jsxElements = (file: AnyNode): AnyNode[] => {
  const out: AnyNode[] = [];
  walk(file, n => {
    if (n.type === 'JSXElement') out.push(n);
  });
  return out;
};

const jsxAttributes = (opening: AnyNode | undefined): AnyNode[] =>
  ((opening?.attributes as AnyNode[] | undefined) ?? []).filter(
    a => a.type === 'JSXAttribute'
  );

const attrName = (attr: AnyNode): string | null =>
  (attr.name as { name?: string } | undefined)?.name ?? null;

/**
 * The statically known value of a JSX attribute, or null when it cannot be
 * resolved. A string or number literal wrapped in an expression container
 * (`width={20}`, `width={'1/2'}`) is just as knowable as a bare `width="fit"`.
 * Everything else, template literals included, stays unresolved and warns.
 */
const staticAttrValue = (value: AnyNode | undefined): string | null => {
  const node =
    value?.type === 'JSXExpressionContainer'
      ? (value.expression as AnyNode | undefined)
      : value;
  return node?.type === 'StringLiteral' || node?.type === 'NumericLiteral'
    ? String(node.value)
    : null;
};

/** local names for the manifest's component names, only when imported */
export const localsFor = (file: AnyNode, components: Iterable<string>) => {
  const wanted = new Set(components);
  const locals = new Map<string, string>(); // local -> canonical name
  for (const imp of collectImports(file)) {
    const src = (imp.source as { value?: string } | undefined)?.value;
    if (src !== MARIGOLD_COMPONENTS) continue;
    for (const spec of (imp.specifiers as AnyNode[] | undefined) ?? []) {
      if (spec.type !== 'ImportSpecifier') continue;
      const imported = (spec.imported as { name?: string } | undefined)?.name;
      const local = (spec.local as { name?: string } | undefined)?.name;
      if (imported && local && wanted.has(imported)) {
        locals.set(local, imported);
      }
    }
  }
  return locals;
};

export interface JsxVisit {
  file: AnyNode;
  source: string;
  /** local name -> canonical component name, for the components asked for */
  locals: Map<string, string>;
}

/**
 * The shared frame of the primitives anchored on @marigold/components: skip
 * without parsing when the file cannot import the package at all, parse-or-
 * skip, resolve the manifest's components to their local names, and skip
 * again when this file imports none of them.
 */
const jsxCodemod = (
  meta: { name: string; description: string },
  components: string[],
  run: (ctx: JsxVisit) => CodemodOutcome
): Codemod => ({
  ...meta,
  apply: source => {
    if (!source.includes(MARIGOLD_COMPONENTS)) {
      return { kind: 'unchanged', warnings: [] };
    }
    return parseOr(source, file => {
      const locals = localsFor(file, components);
      if (locals.size === 0) return { kind: 'unchanged', warnings: [] };
      return run({ file, source, locals });
    });
  },
});

/** Renames props on Marigold components, e.g. Inset `space` to `p`. */
export const renameJsxProps = (manifest: MigrationManifest): Codemod =>
  jsxCodemod(
    {
      name: 'rename-jsx-props',
      description: 'rename component props (e.g. Inset space to p)',
    },
    manifest.jsx.renames.map(e => e.component),
    ({ file, source, locals }) => {
      const s = new MagicString(source);
      const changes: string[] = [];
      for (const el of jsxElements(file)) {
        const component = locals.get(jsxOpeningName(el) ?? '');
        if (!component) continue;
        const opening = el.openingElement as AnyNode | undefined;
        for (const entry of manifest.jsx.renames) {
          if (entry.component !== component) continue;
          for (const attr of jsxAttributes(opening)) {
            if (attrName(attr) !== entry.from) continue;
            const nameNode = attr.name as AnyNode;
            s.overwrite(
              nameNode.start as number,
              nameNode.end as number,
              entry.to
            );
            if (entry.wrapInArray) wrapValueInArray(s, source, attr);
            changes.push(
              `${component}: renamed \`${entry.from}\` to \`${entry.to}\``
            );
          }
        }
      }
      if (changes.length === 0) return { kind: 'unchanged', warnings: [] };
      return { kind: 'edited', output: s.toString(), changes, warnings: [] };
    }
  );

const wrapValueInArray = (
  s: MagicString,
  source: string,
  attr: AnyNode
): void => {
  const value = attr.value as AnyNode | undefined;
  if (!value) return; // boolean attribute, nothing to wrap
  if (value.type === 'StringLiteral') {
    const text = source.slice(value.start as number, value.end as number);
    s.overwrite(value.start as number, value.end as number, `{[${text}]}`);
    return;
  }
  if (value.type === 'JSXExpressionContainer') {
    const expr = value.expression as AnyNode | undefined;
    if (!expr || expr.type === 'ArrayExpression') return; // already an array
    s.appendLeft(expr.start as number, '[');
    s.appendRight(expr.end as number, ']');
  }
};

// Identifier positions that are names/keys, not references to a binding.
// Renaming these would change object shapes, member accesses, or attribute
// names instead of the import usage.
const isNamePosition = (n: AnyNode, parent: AnyNode | null): boolean => {
  if (!parent) return false;
  const computed = (parent as { computed?: boolean }).computed === true;
  switch (parent.type) {
    case 'MemberExpression':
    case 'OptionalMemberExpression':
      return parent.property === n && !computed;
    case 'JSXMemberExpression':
      // `<Icons.Pickup />` — the property names a key on `Icons`, not the
      // import binding; only the object side references a binding
      return parent.property === n;
    case 'ObjectProperty':
    case 'ObjectMethod':
    case 'ClassProperty':
    case 'ClassMethod':
    case 'TSPropertySignature':
    case 'TSMethodSignature':
      return parent.key === n && !computed;
    case 'TSQualifiedName':
      return parent.right === n;
    case 'JSXAttribute':
      return parent.name === n;
    case 'ImportSpecifier':
    case 'ExportSpecifier':
      return true;
    case 'LabeledStatement':
    case 'BreakStatement':
    case 'ContinueStatement':
      return true;
    default:
      return false;
  }
};

// Positions that (re)declare a binding with this name — a shadow of the
// import, which makes a whole-file usage rename unsafe.
const isBindingPosition = (n: AnyNode, parent: AnyNode | null): boolean => {
  if (!parent) return false;
  switch (parent.type) {
    case 'VariableDeclarator':
      return parent.id === n;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ClassDeclaration':
    case 'ClassExpression':
      return parent.id === n;
    case 'ArrowFunctionExpression':
      return ((parent.params as AnyNode[]) ?? []).includes(n);
    case 'CatchClause':
      return parent.param === n;
    // destructuring targets and function params inside patterns
    case 'ObjectPattern':
    case 'ArrayPattern':
    case 'RestElement':
    case 'AssignmentPattern':
      return true;
    // A plain function param (`function f(Pickup) {}`) is deliberately not
    // listed: it produces a correct uniform alpha-rename, and a collision
    // with the target name is caught by `namesInFile` independently.
    default:
      return false;
  }
};

/**
 * Rewrites imports whose exported name changed (e.g. the v18 icon
 * migration). When the file provably allows it, the import AND every usage
 * are renamed directly (`<Pickup />` becomes `<Store />`). When it does not
 * — the old name is shadowed or used in a shorthand property, or the new
 * name already exists in the file — the specifier falls back to the
 * release-notes-blessed alias form (`Store as Pickup`), which keeps every
 * call site valid, and the report names the reason. Already aliased
 * specifiers only swap the imported name.
 */
export const renameImports = (manifest: MigrationManifest): Codemod => {
  // manifest data is constant for the run: index it once
  const byPackage = new Map<
    string,
    Map<string, (typeof manifest.jsx.importRenames)[number]>
  >();
  for (const entry of manifest.jsx.importRenames) {
    const forPackage = byPackage.get(entry.package) ?? new Map();
    forPackage.set(entry.from, entry);
    byPackage.set(entry.package, forPackage);
  }

  const packages = [...byPackage.keys()];

  return {
    name: 'rename-imports',
    description: 'rename moved exports (e.g. the icon renames)',
    apply: source => {
      // these anchor on their own packages (@marigold/icons), not on
      // @marigold/components, so they cannot use the jsxCodemod frame
      if (!packages.some(pkg => source.includes(pkg))) {
        return { kind: 'unchanged', warnings: [] };
      }
      return parseOr(source, file => {
        const s = new MagicString(source);
        const changes: string[] = [];

        // one walk collects everything needed to decide direct vs alias
        const usages = new Map<string, AnyNode[]>(); // renameable references
        const shadowed = new Set<string>();
        const namesInFile = new Set<string>();
        const reexported = new Set<string>(); // `export { Pickup }` locals
        const exportsFrom: AnyNode[] = []; // `export { ... } from '<pkg>'`
        walk(file, (n, parent) => {
          if (n.type === 'ExportNamedDeclaration') {
            if (n.source) {
              exportsFrom.push(n);
            } else {
              // a bare re-export references the local binding by name — a
              // direct rename would leave it pointing at nothing
              for (const spec of (n.specifiers as AnyNode[] | undefined) ??
                []) {
                const local = (spec.local as { name?: string } | undefined)
                  ?.name;
                if (spec.type === 'ExportSpecifier' && local) {
                  reexported.add(local);
                }
              }
            }
            return;
          }
          if (n.type !== 'Identifier' && n.type !== 'JSXIdentifier') return;
          const name = (n as { name?: string }).name;
          if (!name) return;
          namesInFile.add(name);
          if (n.type === 'Identifier' && isBindingPosition(n, parent)) {
            shadowed.add(name);
            return;
          }
          if (
            parent?.type === 'ObjectProperty' &&
            (parent as { shorthand?: boolean }).shorthand === true
          ) {
            // `{ Pickup }` — renaming the value would change the key
            shadowed.add(name);
            return;
          }
          if (isNamePosition(n, parent)) return;
          const list = usages.get(name) ?? [];
          list.push(n);
          usages.set(name, list);
        });

        for (const imp of collectImports(file)) {
          const src = (imp.source as { value?: string } | undefined)?.value;
          const renames = src ? byPackage.get(src) : undefined;
          if (!renames) continue;
          for (const spec of (imp.specifiers as AnyNode[] | undefined) ?? []) {
            if (spec.type !== 'ImportSpecifier') continue;
            const imported = spec.imported as AnyNode;
            const importedName = (imported as { name?: string }).name;
            const localName = (
              spec.local as AnyNode as { name?: string } | undefined
            )?.name;
            const entry = importedName ? renames.get(importedName) : undefined;
            if (!entry) continue;
            const note = entry.note ? ` (${entry.note})` : '';

            if (importedName !== localName) {
              // already aliased: only the imported name changes
              s.overwrite(
                imported.start as number,
                imported.end as number,
                entry.to
              );
              changes.push(
                `${src}: \`${entry.from}\` is now \`${entry.to}\` (existing alias \`${localName}\` kept)${note}`
              );
              continue;
            }

            const aliasReason = namesInFile.has(entry.to)
              ? `\`${entry.to}\` is already used in this file`
              : reexported.has(entry.from)
                ? `\`${entry.from}\` is re-exported from this file`
                : shadowed.has(entry.from)
                  ? `\`${entry.from}\` is re-declared or used as a shorthand property here`
                  : null;

            if (aliasReason) {
              s.overwrite(
                spec.start as number,
                spec.end as number,
                `${entry.to} as ${entry.from}`
              );
              changes.push(
                `${src}: \`${entry.from}\` is now \`${entry.to}\` — imported as \`${entry.to} as ${entry.from}\` because ${aliasReason}${note}`
              );
              continue;
            }

            // safe to rename directly: the import specifier + every usage
            // (specifier identifiers sit in name position and are not part
            // of `usages`, so the specifier is rewritten explicitly)
            s.overwrite(spec.start as number, spec.end as number, entry.to);
            const refs = usages.get(entry.from) ?? [];
            for (const ref of refs) {
              s.overwrite(ref.start as number, ref.end as number, entry.to);
            }
            changes.push(
              `${src}: renamed \`${entry.from}\` to \`${entry.to}\` (import + ${refs.length} usage${refs.length === 1 ? '' : 's'})${note}`
            );
          }
        }

        // `export { Pickup } from '@marigold/icons'`: the specifier reads
        // the package's export directly, so the local walk above never sees
        // it. Rewrite to `Store as Pickup` — the public name downstream
        // consumers import must survive.
        for (const decl of exportsFrom) {
          const src = (decl.source as { value?: string } | undefined)?.value;
          const renames = src ? byPackage.get(src) : undefined;
          if (!renames) continue;
          for (const spec of (decl.specifiers as AnyNode[] | undefined) ?? []) {
            if (spec.type !== 'ExportSpecifier') continue;
            const local = spec.local as AnyNode; // name in the source package
            const localName = (local as { name?: string }).name;
            const entry = localName ? renames.get(localName) : undefined;
            if (!entry) continue;
            const note = entry.note ? ` (${entry.note})` : '';
            const exportedName = (
              spec.exported as { name?: string } | undefined
            )?.name;
            if (exportedName === localName) {
              s.overwrite(
                spec.start as number,
                spec.end as number,
                `${entry.to} as ${entry.from}`
              );
              changes.push(
                `${src}: \`${entry.from}\` is now \`${entry.to}\` — re-exported as \`${entry.to} as ${entry.from}\` to keep the public name${note}`
              );
            } else {
              // already aliased (`export { Pickup as Foo }`): only the
              // source-side name changes
              s.overwrite(local.start as number, local.end as number, entry.to);
              changes.push(
                `${src}: \`${entry.from}\` is now \`${entry.to}\` (public name \`${exportedName}\` kept)${note}`
              );
            }
          }
        }
        if (changes.length === 0) return { kind: 'unchanged', warnings: [] };
        return { kind: 'edited', output: s.toString(), changes, warnings: [] };
      });
    },
  };
};

/**
 * Report-only: namespace imports (`import * as X`) of packages this
 * migration changes. No codemod can follow `X.*` usages — theme anchoring,
 * prop renames and import renames all silently miss them — so the file
 * needs a manual review against the release notes.
 */
export const reportNamespaceImports = (
  manifest: MigrationManifest
): Codemod => {
  const affected = new Set([
    MARIGOLD_COMPONENTS,
    MARIGOLD_SYSTEM,
    ...manifest.jsx.importRenames.map(e => e.package),
  ]);
  return {
    name: 'report-namespace-imports',
    description: 'report namespace imports the codemods cannot follow',
    apply: source => {
      if (![...affected].some(pkg => source.includes(pkg))) {
        return { kind: 'unchanged', warnings: [] };
      }
      return parseOr(source, file => {
        const warnings: string[] = [];
        for (const imp of collectImports(file)) {
          const src = (imp.source as { value?: string } | undefined)?.value;
          if (!src || !affected.has(src)) continue;
          for (const spec of (imp.specifiers as AnyNode[] | undefined) ?? []) {
            if (spec.type !== 'ImportNamespaceSpecifier') continue;
            const local = (spec.local as { name?: string } | undefined)?.name;
            warnings.push(
              `\`import * as ${local} from '${src}'\`: the codemods cannot follow namespace imports — review the \`${local}.*\` usages against the ${manifest.version} changes manually`
            );
          }
        }
        return { kind: 'unchanged', warnings };
      });
    },
  };
};

/** Renames compound members, e.g. Tabs.TabPanel to Tabs.Panel. */
export const renameJsxMembers = (manifest: MigrationManifest): Codemod =>
  jsxCodemod(
    {
      name: 'rename-jsx-members',
      description: 'rename compound components (e.g. Tabs.TabPanel)',
    },
    manifest.jsx.memberRenames.map(e => e.object),
    ({ file, locals, source }) => {
      const s = new MagicString(source);
      const changes: string[] = [];
      const renameTag = (tag: AnyNode | undefined, to: string): void => {
        const property = (tag?.name as AnyNode | undefined)?.property as
          | AnyNode
          | undefined;
        if (property) {
          s.overwrite(property.start as number, property.end as number, to);
        }
      };
      for (const el of jsxElements(file)) {
        const opening = el.openingElement as AnyNode | undefined;
        const name = opening?.name as AnyNode | undefined;
        if (name?.type !== 'JSXMemberExpression') continue;
        const object = name.object as AnyNode | undefined;
        const property = name.property as AnyNode | undefined;
        if (object?.type !== 'JSXIdentifier') continue;
        const component = locals.get((object as { name?: string }).name ?? '');
        if (!component) continue;
        for (const entry of manifest.jsx.memberRenames) {
          if (
            entry.object !== component ||
            (property as { name?: string })?.name !== entry.from
          ) {
            continue;
          }
          renameTag(opening, entry.to);
          renameTag(el.closingElement as AnyNode | undefined, entry.to);
          changes.push(
            `\`${component}.${entry.from}\`: renamed to \`${component}.${entry.to}\``
          );
        }
      }
      if (changes.length === 0) return { kind: 'unchanged', warnings: [] };
      return { kind: 'edited', output: s.toString(), changes, warnings: [] };
    }
  );

/** Removes props the target version dropped, e.g. TextField min/max. */
export const removeJsxProps = (manifest: MigrationManifest): Codemod =>
  jsxCodemod(
    {
      name: 'remove-jsx-props',
      description: 'remove props the target version dropped',
    },
    manifest.jsx.removals.map(e => e.component),
    ({ file, locals, source }) => {
      const s = new MagicString(source);
      const changes: string[] = [];
      for (const el of jsxElements(file)) {
        const component = locals.get(jsxOpeningName(el) ?? '');
        if (!component) continue;
        const opening = el.openingElement as AnyNode | undefined;
        for (const entry of manifest.jsx.removals) {
          if (entry.component !== component) continue;
          for (const attr of jsxAttributes(opening)) {
            if (attrName(attr) !== entry.prop) continue;
            let start = attr.start as number;
            while (start > 0 && /\s/.test(source[start - 1])) start--;
            s.remove(start, attr.end as number);
            changes.push(
              `${component}: removed \`${entry.prop}\`${entry.note ? ` (${entry.note})` : ''}`
            );
          }
        }
      }
      if (changes.length === 0) return { kind: 'unchanged', warnings: [] };
      return { kind: 'edited', output: s.toString(), changes, warnings: [] };
    }
  );

/**
 * Report-only: usages that need a human decision (removed components,
 * props that moved structurally, design decisions). Value-conditional
 * entries also warn when the value cannot be verified statically.
 */
export const reportJsxUsage = (manifest: MigrationManifest): Codemod =>
  jsxCodemod(
    {
      name: 'report-jsx-usage',
      description: 'report usages that need a human decision',
    },
    manifest.jsx.warnings.map(e => e.component),
    ({ file, locals }) => {
      const warnings: string[] = [];
      const imported = new Set(locals.values());
      for (const entry of manifest.jsx.warnings) {
        if (!entry.prop && imported.has(entry.component)) {
          warnings.push(`${entry.component}: ${entry.text}`);
        }
      }

      for (const el of jsxElements(file)) {
        const component = locals.get(jsxOpeningName(el) ?? '');
        if (!component) continue;
        const opening = el.openingElement as AnyNode | undefined;
        for (const entry of manifest.jsx.warnings) {
          if (entry.component !== component || !entry.prop) continue;
          for (const attr of jsxAttributes(opening)) {
            if (attrName(attr) !== entry.prop) continue;
            if (entry.value !== undefined) {
              const literal = staticAttrValue(
                attr.value as AnyNode | undefined
              );
              // a non-literal value cannot be ruled out statically: warn too
              if (literal !== null && literal !== entry.value) continue;
            }
            warnings.push(`${component}[${entry.prop}]: ${entry.text}`);
          }
        }
      }
      return { kind: 'unchanged', warnings };
    }
  );
