import ts from 'typescript';
import { parseSource } from './source.js';

// The render sandbox stages the target file alone and mounts its default export
// or a named `App` export (see harness/entry.tsx). A file it cannot load used to
// launch Chromium anyway and wait out the whole render budget, then report a
// misleading error. These are the two cases that are knowable from the source.

const isRelative = (specifier: string): boolean =>
  specifier.startsWith('./') || specifier.startsWith('../');

// `import type`, `import { type A }` and `export { type A } from` are erased
// before the module runs, so the sandbox never requests them.
const isErasedImport = (node: ts.ImportDeclaration): boolean => {
  const clause = node.importClause;
  if (!clause) return false; // side-effect import: `import './x.css'`
  if (clause.phaseModifier === ts.SyntaxKind.TypeKeyword) return true;
  if (clause.name) return false;
  const bindings = clause.namedBindings;
  return (
    bindings !== undefined &&
    ts.isNamedImports(bindings) &&
    bindings.elements.length > 0 &&
    bindings.elements.every(e => e.isTypeOnly)
  );
};

const isErasedReexport = (node: ts.ExportDeclaration): boolean =>
  node.isTypeOnly ||
  (node.exportClause !== undefined &&
    ts.isNamedExports(node.exportClause) &&
    node.exportClause.elements.length > 0 &&
    node.exportClause.elements.every(e => e.isTypeOnly));

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node) ?? []).some(m => m.kind === kind);

const findLocalImport = (source: ts.SourceFile): string | undefined => {
  for (const node of source.statements) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      isRelative(node.moduleSpecifier.text) &&
      !isErasedImport(node)
    ) {
      return node.moduleSpecifier.text;
    }
    if (
      ts.isExportDeclaration(node) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      isRelative(node.moduleSpecifier.text) &&
      !isErasedReexport(node)
    ) {
      return node.moduleSpecifier.text;
    }
  }
  return undefined;
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
        d => ts.isIdentifier(d.name) && d.name.text === 'App'
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
