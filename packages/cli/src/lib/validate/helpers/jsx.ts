import ts from 'typescript';

export type ImportDecl = {
  module: string;
  names: string[];
};

export const collectImports = (source: ts.SourceFile): ImportDecl[] => {
  const imports: ImportDecl[] = [];

  for (const stmt of source.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    if (!ts.isStringLiteral(stmt.moduleSpecifier)) continue;

    const module = stmt.moduleSpecifier.text;
    const names: string[] = [];

    if (stmt.importClause) {
      if (stmt.importClause.name) {
        names.push(stmt.importClause.name.text);
      }
      const bindings = stmt.importClause.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) {
        for (const el of bindings.elements) {
          names.push(el.name.text);
        }
      }
      if (bindings && ts.isNamespaceImport(bindings)) {
        names.push(bindings.name.text);
      }
    }

    imports.push({ module, names });
  }

  return imports;
};
