import { parse } from '@babel/parser';

// Pure, side-effect-free AST helpers shared by the editing commands
// (lib/edit-tsx.ts) and the read-only diagnostics command (lib/doctor). Keeping
// them here means detection logic can reuse the exact same parsing/traversal the
// editor relies on, without pulling in MagicString or the edit machinery.

export type AnyNode = {
  type: string;
  start?: number | null;
  end?: number | null;
} & {
  [key: string]: unknown;
};

export const parseTsx = (source: string) =>
  parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
    errorRecovery: true,
  });

const SKIP_KEYS = new Set([
  'loc',
  'leadingComments',
  'trailingComments',
  'innerComments',
  'tokens',
  'extra',
  'comments',
]);

export const walk = (
  node: unknown,
  visitor: (n: AnyNode, parent: AnyNode | null) => void,
  parent: AnyNode | null = null
): void => {
  if (!node || typeof node !== 'object') return;
  const n = node as AnyNode;
  if (typeof n.type === 'string') visitor(n, parent);
  for (const key of Object.keys(n)) {
    if (SKIP_KEYS.has(key)) continue;
    const value = n[key];
    if (Array.isArray(value)) {
      for (const v of value) walk(v, visitor, n);
    } else if (value && typeof value === 'object') {
      walk(value, visitor, n);
    }
  }
};

export const collectImports = (file: AnyNode): AnyNode[] => {
  const out: AnyNode[] = [];
  walk(file, n => {
    if (n.type === 'ImportDeclaration') out.push(n);
  });
  return out;
};

export const importIncludes = (
  imports: AnyNode[],
  source: string,
  named?: string,
  defaultName?: string
): boolean =>
  imports.some(imp => {
    const src = (imp.source as { value?: string } | undefined)?.value;
    if (src !== source) return false;
    const specifiers = (imp.specifiers as AnyNode[] | undefined) ?? [];
    if (defaultName) {
      return specifiers.some(
        s =>
          s.type === 'ImportDefaultSpecifier' &&
          (s.local as { name?: string } | undefined)?.name === defaultName
      );
    }
    if (named) {
      return specifiers.some(
        s =>
          s.type === 'ImportSpecifier' &&
          (s.imported as { name?: string } | undefined)?.name === named
      );
    }
    return true;
  });

export const lastImportEnd = (imports: AnyNode[]): number => {
  let max = 0;
  for (const imp of imports) {
    if (typeof imp.end === 'number' && imp.end > max) max = imp.end;
  }
  return max;
};

export const jsxOpeningName = (el: AnyNode): string | null => {
  const opening = el.openingElement as AnyNode | undefined;
  if (!opening) return null;
  const name = opening.name as AnyNode | undefined;
  if (!name) return null;
  if (name.type === 'JSXIdentifier') {
    return (name as { name?: string }).name ?? null;
  }
  return null;
};

export const findChildrenExpressionContainer = (
  file: AnyNode
): { node: AnyNode; parent: AnyNode | null } | null => {
  let found: { node: AnyNode; parent: AnyNode | null } | null = null;
  walk(file, (n, parent) => {
    if (found) return;
    if (n.type !== 'JSXExpressionContainer') return;
    const expr = n.expression as AnyNode | undefined;
    if (!expr || expr.type !== 'Identifier') return;
    if ((expr as { name?: string }).name !== 'children') return;
    found = { node: n, parent };
  });
  return found;
};

export const findRenderArgument = (
  file: AnyNode
): { node: AnyNode; parent: AnyNode | null } | null => {
  let found: { node: AnyNode; parent: AnyNode | null } | null = null;
  walk(file, n => {
    if (found) return;
    if (n.type !== 'CallExpression') return;
    const callee = n.callee as AnyNode | undefined;
    if (!callee || callee.type !== 'MemberExpression') return;
    const prop = callee.property as AnyNode | undefined;
    if (!prop || prop.type !== 'Identifier') return;
    if ((prop as { name?: string }).name !== 'render') return;
    const args = n.arguments as AnyNode[] | undefined;
    if (!args || args.length === 0) return;
    const first = args[0];
    if (first.type !== 'JSXElement' && first.type !== 'JSXFragment') return;
    found = { node: first, parent: n };
  });
  return found;
};
