import ts from 'typescript';
import { parseSource } from './source.js';

// The render sandbox stages the target file alone and mounts its default export
// or a named `App` export (see harness/entry.tsx). A file it cannot load used to
// launch Chromium anyway and wait out the whole render budget, then report a
// misleading error. These are the two cases that are knowable from the source.

const isRelative = (specifier: string): boolean =>
  specifier === '.' ||
  specifier === '..' ||
  /^\.{1,2}\//.test(specifier) ||
  specifier.startsWith('/');

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node)?.some(m => m.kind === kind) ?? false);

// The sandbox's TypeScript transform drops every import whose bindings are only
// used as types, marked `type` or not, before the module runs. TypeScript's own
// transpile applies the same rule, so the local imports left in its output are
// the ones the sandbox would actually request.
const findLocalImport = (source: ts.SourceFile): string | undefined => {
  const { outputText } = ts.transpileModule(source.getFullText(), {
    fileName: source.fileName,
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
    },
  });
  const emitted = ts.createSourceFile(
    'emitted.jsx',
    outputText,
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.JSX
  );
  // Static imports and re-exports, plus a dynamic `import('./x')` anywhere in
  // the file, as in `lazy(() => import('./Page'))`.
  const visit = (node: ts.Node): string | undefined => {
    const specifier =
      ts.isImportDeclaration(node) || ts.isExportDeclaration(node)
        ? node.moduleSpecifier
        : ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword
          ? node.arguments[0]
          : undefined;
    if (
      specifier &&
      ts.isStringLiteral(specifier) &&
      isRelative(specifier.text)
    ) {
      return specifier.text;
    }
    return ts.forEachChild(node, visit);
  };
  return visit(emitted);
};

// True when the harness would find a component, or when the source cannot tell
// (an `export *` may supply it), so the render is only skipped on certainty.
const mayExportComponent = (source: ts.SourceFile): boolean => {
  for (const node of source.statements) {
    if (ts.isExportAssignment(node) && !node.isExportEquals) return true;
    if (ts.isExportDeclaration(node)) {
      if (!node.exportClause) return true; // export * from '…'
      if (
        ts.isNamedExports(node.exportClause) &&
        node.exportClause.elements.some(
          e => e.name.text === 'default' || e.name.text === 'App'
        )
      ) {
        return true;
      }
      continue;
    }
    if (!hasModifier(node, ts.SyntaxKind.ExportKeyword)) continue;
    if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) return true;
    if (
      (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
      node.name?.text === 'App'
    ) {
      return true;
    }
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.some(
        // A destructuring export (`export const { App } = pages`) is not
        // resolved here, so it counts as possibly exporting `App`.
        d => !ts.isIdentifier(d.name) || d.name.text === 'App'
      )
    ) {
      return true;
    }
  }
  return false;
};

// Why the rendered checks cannot run on this file, or undefined when they can.
// A file that cannot be parsed is left to the existing error paths.
export const renderSkipReason = (filePath: string): string | undefined => {
  let source: ts.SourceFile;
  try {
    source = parseSource(filePath);
  } catch {
    return undefined;
  }
  const local = findLocalImport(source);
  if (local) {
    return `it imports the local module "${local}", and the render sandbox loads only this file`;
  }
  if (!mayExportComponent(source)) {
    return 'the render sandbox needs a default export or a named export called "App", and the file has neither';
  }
  return undefined;
};
