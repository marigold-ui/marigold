import ts from 'typescript';

export const parseSource = (
  filePath: string,
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
): ts.SourceFile => {
  const text = ts.sys.readFile(filePath);
  if (!text) {
    throw new Error(`Could not read file: ${filePath}`);
  }

  return ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.ES2022,
    true,
    scriptKind
  );
};
