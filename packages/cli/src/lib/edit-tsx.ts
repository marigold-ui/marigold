import { parse } from '@babel/parser';
import MagicString from 'magic-string';

type AnyNode = { type: string; start?: number | null; end?: number | null } & {
  [key: string]: unknown;
};

export type TsxEditOutcome =
  | { kind: 'edited'; output: string; changes: string[] }
  | { kind: 'unchanged'; reason: string }
  | { kind: 'skipped'; reason: string };

const parseTsx = (source: string) =>
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

const walk = (
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

const collectImports = (file: AnyNode): AnyNode[] => {
  const out: AnyNode[] = [];
  walk(file, n => {
    if (n.type === 'ImportDeclaration') out.push(n);
  });
  return out;
};

const importIncludes = (
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

const lastImportEnd = (imports: AnyNode[]): number => {
  let max = 0;
  for (const imp of imports) {
    if (typeof imp.end === 'number' && imp.end > max) max = imp.end;
  }
  return max;
};

const jsxOpeningName = (el: AnyNode): string | null => {
  const opening = el.openingElement as AnyNode | undefined;
  if (!opening) return null;
  const name = opening.name as AnyNode | undefined;
  if (!name) return null;
  if (name.type === 'JSXIdentifier') {
    return (name as { name?: string }).name ?? null;
  }
  return null;
};

const findChildrenExpressionContainer = (
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

const findRenderArgument = (
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

const insertImport = (
  s: MagicString,
  file: AnyNode,
  imports: AnyNode[],
  importStmt: string
): void => {
  if (imports.length === 0) {
    s.prependLeft(0, importStmt + '\n');
    return;
  }
  const end = lastImportEnd(imports);
  s.appendRight(end, '\n' + importStmt);
};

export interface NextLayoutEditOptions {
  /** import path for the Providers component, e.g. './providers' */
  providersImport: string;
}

export const editNextLayout = (
  source: string,
  options: NextLayoutEditOptions
): TsxEditOutcome => {
  let ast;
  try {
    ast = parseTsx(source);
  } catch (err) {
    return {
      kind: 'skipped',
      reason: `parse error: ${(err as Error).message}`,
    };
  }

  const file = ast as unknown as AnyNode;
  const imports = collectImports(file);
  const target = findChildrenExpressionContainer(file);

  if (!target) {
    return {
      kind: 'skipped',
      reason: 'could not find {children} JSX in layout',
    };
  }

  const parentName = target.parent ? jsxOpeningName(target.parent) : null;
  const alreadyWrapped =
    parentName === 'Providers' || parentName === 'MarigoldProvider';

  const hasImport = importIncludes(
    imports,
    options.providersImport,
    'Providers'
  );

  if (alreadyWrapped && hasImport) {
    return { kind: 'unchanged', reason: 'layout already wrapped' };
  }

  const s = new MagicString(source);
  const changes: string[] = [];

  if (!hasImport) {
    insertImport(
      s,
      file,
      imports,
      `import { Providers } from '${options.providersImport}';`
    );
    changes.push('added Providers import');
  }

  if (!alreadyWrapped) {
    const start = target.node.start as number;
    const end = target.node.end as number;
    s.appendLeft(start, '<Providers>');
    s.appendRight(end, '</Providers>');
    changes.push('wrapped {children} with <Providers>');
  }

  return { kind: 'edited', output: s.toString(), changes };
};

export const editViteEntry = (source: string): TsxEditOutcome => {
  let ast;
  try {
    ast = parseTsx(source);
  } catch (err) {
    return {
      kind: 'skipped',
      reason: `parse error: ${(err as Error).message}`,
    };
  }

  const file = ast as unknown as AnyNode;
  const imports = collectImports(file);
  const target = findRenderArgument(file);

  if (!target) {
    return {
      kind: 'skipped',
      reason: 'could not find render(<App />) call',
    };
  }

  const parentName =
    target.node.type === 'JSXElement' ? jsxOpeningName(target.node) : null;
  const alreadyWrapped = parentName === 'MarigoldProvider';

  const hasProviderImport = importIncludes(
    imports,
    '@marigold/components',
    'MarigoldProvider'
  );
  const hasThemeImport = importIncludes(
    imports,
    '@marigold/theme-rui',
    undefined,
    'theme'
  );

  if (alreadyWrapped && hasProviderImport && hasThemeImport) {
    return { kind: 'unchanged', reason: 'entry already wrapped' };
  }

  const s = new MagicString(source);
  const changes: string[] = [];

  if (!hasProviderImport) {
    insertImport(
      s,
      file,
      imports,
      `import { MarigoldProvider } from '@marigold/components';`
    );
    changes.push('added MarigoldProvider import');
  }
  if (!hasThemeImport) {
    insertImport(s, file, imports, `import theme from '@marigold/theme-rui';`);
    changes.push('added theme import');
  }

  if (!alreadyWrapped) {
    const start = target.node.start as number;
    const end = target.node.end as number;
    s.appendLeft(start, '<MarigoldProvider theme={theme}>');
    s.appendRight(end, '</MarigoldProvider>');
    changes.push('wrapped root JSX with <MarigoldProvider>');
  }

  return { kind: 'edited', output: s.toString(), changes };
};

export const PROVIDERS_TEMPLATE = `'use client';
import { MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-rui';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MarigoldProvider theme={theme}>{children}</MarigoldProvider>;
}
`;
