import fs from 'node:fs';
import path from 'node:path';
import { exists, firstExisting } from '../fs-utils.js';
import {
  type AnyNode,
  collectImports,
  jsxOpeningName,
  parseTsx,
  walk,
} from '../tsx-ast.js';

// Read-only root-layout candidates. Deliberately broader than the shared
// detectRootLayout() (which init uses to decide what to *edit*): doctor only
// reads, so it can also look at the Pages Router entry.
export const LAYOUT_CANDIDATES = [
  'app/layout.tsx',
  'app/layout.jsx',
  'src/app/layout.tsx',
  'src/app/layout.jsx',
  'pages/_app.tsx',
  'pages/_app.jsx',
  'src/pages/_app.tsx',
  'src/pages/_app.jsx',
  'src/main.tsx',
  'src/main.jsx',
  'src/App.tsx',
  'src/App.jsx',
] as const;

export interface ProviderDetection {
  /** The root layout/entry file we inspected, or null if none was found. */
  layoutFile: string | null;
  /** Where MarigoldProvider was ultimately looked for (layout or a resolved
   * providers file). */
  inspectedFile: string | null;
  /** A `<MarigoldProvider>` was found (directly or via a resolved `<Providers>`). */
  providerFound: boolean;
  /** `MarigoldProvider` is actually bound where it's used (imported or declared).
   * A `<MarigoldProvider>` element with no matching import is a runtime error. */
  providerImported: boolean;
  /** The found provider receives a `theme` prop (or a spread that may carry it). */
  themePassed: boolean;
  /** The `theme` prop's value resolves to a real binding. False only when a bare
   * identifier (`theme={theme}`) is passed with no matching import/declaration. */
  themeImported: boolean;
}

// Detection quartet, minus the file-location bookkeeping detectProvider adds.
type Analysis = Pick<
  ProviderDetection,
  'providerFound' | 'providerImported' | 'themePassed' | 'themeImported'
>;

const NOT_FOUND: Analysis = {
  providerFound: false,
  providerImported: false,
  themePassed: false,
  themeImported: false,
};

const parseFile = (file: string): AnyNode | null => {
  try {
    return parseTsx(fs.readFileSync(file, 'utf8')) as unknown as AnyNode;
  } catch {
    return null;
  }
};

const findElement = (file: AnyNode, name: string): AnyNode | null => {
  let hit: AnyNode | null = null;
  walk(file, n => {
    if (hit) return;
    if (n.type === 'JSXElement' && jsxOpeningName(n) === name) hit = n;
  });
  return hit;
};

// The `theme` prop as written on the element:
//  - 'none'        no theme prop at all
//  - 'identifier'  theme={someName} — a binding we can verify
//  - 'other'       theme="..."/theme={<expr>}, or a {...spread} that may carry it
//                  (unverifiable, so we never flag it)
type ThemeProp =
  | { kind: 'none' }
  | { kind: 'identifier'; name: string }
  | { kind: 'other' };

const themeProp = (el: AnyNode): ThemeProp => {
  const opening = el.openingElement as AnyNode | undefined;
  const attrs = (opening?.attributes as AnyNode[] | undefined) ?? [];
  const explicit = attrs.find(
    a =>
      a.type === 'JSXAttribute' &&
      (a.name as { name?: string } | undefined)?.name === 'theme'
  ) as AnyNode | undefined;
  if (explicit) {
    const value = explicit.value as AnyNode | undefined;
    if (value?.type === 'JSXExpressionContainer') {
      const expr = value.expression as AnyNode | undefined;
      if (expr?.type === 'Identifier') {
        return {
          kind: 'identifier',
          name: (expr as { name?: string }).name ?? '',
        };
      }
    }
    return { kind: 'other' };
  }
  // A spread ({...props}) might carry `theme` — don't flag a false negative.
  if (attrs.some(a => a.type === 'JSXSpreadAttribute'))
    return { kind: 'other' };
  return { kind: 'none' };
};

// Pull the identifier name(s) a binding pattern introduces, recursing through
// destructuring so `({ theme })` and `[a, ...rest]` are covered.
const addPatternNames = (
  node: AnyNode | undefined | null,
  out: Set<string>
) => {
  if (!node) return;
  switch (node.type) {
    case 'Identifier':
      if (typeof node.name === 'string') out.add(node.name);
      break;
    case 'ObjectPattern':
      for (const p of (node.properties as AnyNode[] | undefined) ?? [])
        addPatternNames(p, out);
      break;
    case 'ObjectProperty':
      addPatternNames(node.value as AnyNode, out);
      break;
    case 'ArrayPattern':
      for (const e of (node.elements as AnyNode[] | undefined) ?? [])
        addPatternNames(e, out);
      break;
    case 'AssignmentPattern':
      addPatternNames(node.left as AnyNode, out);
      break;
    case 'RestElement':
      addPatternNames(node.argument as AnyNode, out);
      break;
  }
};

// Every identifier this file binds — imports, declarations, and function
// parameters. A JSX reference to a name that is *not* bound here (e.g.
// `<MarigoldProvider>` or `theme={theme}` with the import line deleted) is a
// runtime ReferenceError: exactly the "looks wired up but is broken" case.
const collectBoundNames = (file: AnyNode): Set<string> => {
  const names = new Set<string>();
  walk(file, n => {
    switch (n.type) {
      case 'ImportDefaultSpecifier':
      case 'ImportNamespaceSpecifier':
      case 'ImportSpecifier':
        addPatternNames(n.local as AnyNode, names);
        break;
      case 'VariableDeclarator':
        addPatternNames(n.id as AnyNode, names);
        break;
      case 'FunctionDeclaration':
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        addPatternNames(n.id as AnyNode, names); // id may be null
        for (const p of (n.params as AnyNode[] | undefined) ?? [])
          addPatternNames(p, names);
        break;
      case 'ClassDeclaration':
      case 'ClassExpression':
        addPatternNames(n.id as AnyNode, names);
        break;
    }
  });
  return names;
};

// Analyze a located `<MarigoldProvider>` against the file it lives in, so
// binding checks run in the right module (layout vs. a resolved providers file).
const analyzeProvider = (
  containingFile: AnyNode,
  provider: AnyNode
): Analysis => {
  const bound = collectBoundNames(containingFile);
  const theme = themeProp(provider);
  return {
    providerFound: true,
    providerImported: bound.has('MarigoldProvider'),
    themePassed: theme.kind !== 'none',
    themeImported:
      theme.kind === 'identifier'
        ? bound.has(theme.name)
        : theme.kind === 'other', // spread/expr → assume ok; 'none' → nothing to bind
  };
};

// Find the module source of a named import (e.g. `Providers`) within a file.
const importSourceOf = (file: AnyNode, named: string): string | null => {
  for (const imp of collectImports(file)) {
    const specifiers = (imp.specifiers as AnyNode[] | undefined) ?? [];
    const match = specifiers.some(
      s =>
        (s.type === 'ImportSpecifier' &&
          (s.imported as { name?: string } | undefined)?.name === named) ||
        (s.type === 'ImportDefaultSpecifier' &&
          (s.local as { name?: string } | undefined)?.name === named)
    );
    if (match) {
      return (imp.source as { value?: string } | undefined)?.value ?? null;
    }
  }
  return null;
};

// Resolve a relative import specifier to a file on disk.
const resolveRelative = (fromFile: string, spec: string): string | null => {
  if (!spec.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  const withExt = firstExisting(path.dirname(base), [
    `${path.basename(base)}.tsx`,
    `${path.basename(base)}.ts`,
    `${path.basename(base)}.jsx`,
    `${path.basename(base)}.js`,
  ]);
  if (withExt) return withExt;
  for (const idx of ['index.tsx', 'index.ts', 'index.jsx', 'index.js']) {
    const p = path.join(base, idx);
    if (exists(p)) return p;
  }
  return null;
};

const inspect = (
  file: AnyNode,
  filePath: string
): Analysis & { providerFile: string | null } => {
  const provider = findElement(file, 'MarigoldProvider');
  if (provider) {
    return { ...analyzeProvider(file, provider), providerFile: filePath };
  }
  // Next convention: layout renders <Providers>, which lives in providers.tsx.
  if (findElement(file, 'Providers')) {
    const src = importSourceOf(file, 'Providers');
    const resolved = src ? resolveRelative(filePath, src) : null;
    const providersAst = resolved ? parseFile(resolved) : null;
    if (providersAst && resolved) {
      const inner = findElement(providersAst, 'MarigoldProvider');
      if (inner) {
        return {
          ...analyzeProvider(providersAst, inner),
          providerFile: resolved,
        };
      }
    }
  }
  return { ...NOT_FOUND, providerFile: null };
};

export const detectProvider = (cwd: string): ProviderDetection => {
  const layoutFile = firstExisting(cwd, LAYOUT_CANDIDATES);
  if (!layoutFile) {
    return { layoutFile: null, inspectedFile: null, ...NOT_FOUND };
  }
  const ast = parseFile(layoutFile);
  if (!ast) {
    return { layoutFile, inspectedFile: null, ...NOT_FOUND };
  }
  const { providerFile, ...analysis } = inspect(ast, layoutFile);
  return {
    layoutFile,
    // Point at the file that actually holds the provider (a resolved
    // providers.tsx when the layout only renders <Providers>).
    inspectedFile: providerFile ?? layoutFile,
    ...analysis,
  };
};
