import MagicString from 'magic-string';
import {
  type AnyNode,
  collectImports,
  findChildrenExpressionContainer,
  findRenderArgument,
  importIncludes,
  jsxOpeningName,
  lastImportEnd,
  parseTsx,
} from './tsx-ast.js';

export type TsxEditOutcome =
  | { kind: 'edited'; output: string; changes: string[] }
  | { kind: 'unchanged'; reason: string }
  | { kind: 'skipped'; reason: string };

export const insertImport = (
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

  if (!hasImport && !alreadyWrapped) {
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

  if (changes.length === 0) {
    return { kind: 'unchanged', reason: 'layout already wrapped' };
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
