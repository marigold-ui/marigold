import { parse } from '@babel/parser';
import MagicString from 'magic-string';

type AnyNode = { type: string; start?: number | null; end?: number | null } & {
  [key: string]: unknown;
};

export type ViteConfigEditOutcome =
  | { kind: 'edited'; output: string; changes: string[] }
  | { kind: 'unchanged'; reason: string }
  | { kind: 'skipped'; reason: string };

const SKIP_KEYS = new Set([
  'loc',
  'leadingComments',
  'trailingComments',
  'innerComments',
  'tokens',
  'extra',
  'comments',
]);

const walk = (node: unknown, visitor: (n: AnyNode) => void): void => {
  if (!node || typeof node !== 'object') return;
  const n = node as AnyNode;
  if (typeof n.type === 'string') visitor(n);
  for (const key of Object.keys(n)) {
    if (SKIP_KEYS.has(key)) continue;
    const value = n[key];
    if (Array.isArray(value)) {
      for (const v of value) walk(v, visitor);
    } else if (value && typeof value === 'object') {
      walk(value, visitor);
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

const hasDefaultImport = (
  imports: AnyNode[],
  source: string,
  defaultName: string
): boolean =>
  imports.some(imp => {
    const src = (imp.source as { value?: string } | undefined)?.value;
    if (src !== source) return false;
    const specifiers = (imp.specifiers as AnyNode[] | undefined) ?? [];
    return specifiers.some(
      s =>
        s.type === 'ImportDefaultSpecifier' &&
        (s.local as { name?: string } | undefined)?.name === defaultName
    );
  });

const lastImportEnd = (imports: AnyNode[]): number => {
  let max = 0;
  for (const imp of imports) {
    if (typeof imp.end === 'number' && imp.end > max) max = imp.end;
  }
  return max;
};

const findPluginsArray = (file: AnyNode): AnyNode | null => {
  let found: AnyNode | null = null;
  walk(file, n => {
    if (found) return;
    if (n.type !== 'ObjectProperty' && n.type !== 'Property') return;
    const key = n.key as AnyNode | undefined;
    if (!key) return;
    const keyName =
      key.type === 'Identifier'
        ? (key as { name?: string }).name
        : key.type === 'StringLiteral'
          ? (key as { value?: string }).value
          : null;
    if (keyName !== 'plugins') return;
    const value = n.value as AnyNode | undefined;
    if (!value || value.type !== 'ArrayExpression') return;
    found = value;
  });
  return found;
};

const arrayContainsCall = (arr: AnyNode, name: string): boolean => {
  const elements = (arr.elements as (AnyNode | null)[] | undefined) ?? [];
  return elements.some(el => {
    if (!el || el.type !== 'CallExpression') return false;
    const callee = el.callee as AnyNode | undefined;
    if (!callee || callee.type !== 'Identifier') return false;
    return (callee as { name?: string }).name === name;
  });
};

export const editViteConfig = (source: string): ViteConfigEditOutcome => {
  let ast;
  try {
    ast = parse(source, {
      sourceType: 'module',
      plugins: ['typescript'],
      errorRecovery: true,
    });
  } catch (err) {
    return {
      kind: 'skipped',
      reason: `parse error: ${(err as Error).message}`,
    };
  }

  const file = ast as unknown as AnyNode;
  const imports = collectImports(file);
  const pluginsArray = findPluginsArray(file);

  if (!pluginsArray) {
    return {
      kind: 'skipped',
      reason: 'could not find plugins: [...] in vite config',
    };
  }

  const hasImport = hasDefaultImport(
    imports,
    '@tailwindcss/vite',
    'tailwindcss'
  );
  const hasCall = arrayContainsCall(pluginsArray, 'tailwindcss');

  if (hasImport && hasCall) {
    return { kind: 'unchanged', reason: 'tailwindcss plugin already present' };
  }

  const s = new MagicString(source);
  const changes: string[] = [];

  if (!hasImport) {
    if (imports.length === 0) {
      s.prependLeft(0, `import tailwindcss from '@tailwindcss/vite';\n`);
    } else {
      s.appendRight(
        lastImportEnd(imports),
        `\nimport tailwindcss from '@tailwindcss/vite';`
      );
    }
    changes.push('added @tailwindcss/vite import');
  }

  if (!hasCall) {
    const elements =
      (pluginsArray.elements as (AnyNode | null)[] | undefined) ?? [];
    const lastEl = [...elements].reverse().find((e): e is AnyNode => !!e);
    if (lastEl && typeof lastEl.end === 'number') {
      s.appendRight(lastEl.end, ', tailwindcss()');
    } else {
      const arrStart = pluginsArray.start as number;
      s.appendRight(arrStart + 1, 'tailwindcss()');
    }
    changes.push('registered tailwindcss() plugin');
  }

  return { kind: 'edited', output: s.toString(), changes };
};
