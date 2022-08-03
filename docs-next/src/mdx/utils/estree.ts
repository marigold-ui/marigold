import {
  Identifier,
  ExportNamedDeclaration,
  Program,
  VariableDeclaration,
} from 'estree';
import { visit } from 'estree-util-visit';

export const getFirstNamedExport = (tree: Program) => {
  let namedExport: string | undefined;

  visit(tree, node => {
    if (namedExport) {
      return;
    }
    if (node.type === 'ExportNamedDeclaration') {
      const declaration = (node as ExportNamedDeclaration)
        .declaration as VariableDeclaration;
      const variable = declaration.declarations.find(
        child => child.type === 'VariableDeclarator'
      );
      namedExport = (variable?.id as Identifier)?.name;
    }
  });

  if (!namedExport) {
    throw Error(
      'No component for demo found. Please make sure to export a component from your demo file.'
    );
  }
  return namedExport;
};
