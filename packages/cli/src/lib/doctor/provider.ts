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
  /** The found provider receives a `theme` prop (or a spread that may carry it). */
  themePassed: boolean;
}

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

const elementReceivesTheme = (el: AnyNode): boolean => {
  const opening = el.openingElement as AnyNode | undefined;
  const attrs = (opening?.attributes as AnyNode[] | undefined) ?? [];
  return attrs.some(a => {
    // A spread ({...props}) might carry `theme` — don't flag a false negative.
    if (a.type === 'JSXSpreadAttribute') return true;
    return (
      a.type === 'JSXAttribute' &&
      (a.name as { name?: string } | undefined)?.name === 'theme'
    );
  });
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
): { providerFound: boolean; themePassed: boolean } => {
  const provider = findElement(file, 'MarigoldProvider');
  if (provider) {
    return { providerFound: true, themePassed: elementReceivesTheme(provider) };
  }
  // Next convention: layout renders <Providers>, which lives in providers.tsx.
  if (findElement(file, 'Providers')) {
    const src = importSourceOf(file, 'Providers');
    const resolved = src ? resolveRelative(filePath, src) : null;
    const providersAst = resolved ? parseFile(resolved) : null;
    if (providersAst) {
      const inner = findElement(providersAst, 'MarigoldProvider');
      if (inner) {
        return {
          providerFound: true,
          themePassed: elementReceivesTheme(inner),
        };
      }
    }
  }
  return { providerFound: false, themePassed: false };
};

export const detectProvider = (cwd: string): ProviderDetection => {
  const layoutFile = firstExisting(cwd, LAYOUT_CANDIDATES);
  if (!layoutFile) {
    return {
      layoutFile: null,
      inspectedFile: null,
      providerFound: false,
      themePassed: false,
    };
  }
  const ast = parseFile(layoutFile);
  if (!ast) {
    return {
      layoutFile,
      inspectedFile: null,
      providerFound: false,
      themePassed: false,
    };
  }
  const { providerFound, themePassed } = inspect(ast, layoutFile);
  return { layoutFile, inspectedFile: layoutFile, providerFound, themePassed };
};
