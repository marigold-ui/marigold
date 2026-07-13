import ts from 'typescript';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mts',
  '.mjs',
]);

export const parseSource = (
  filePath: string,
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
): ts.SourceFile => {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    throw new Error(
      `Unsupported file type "${ext}". Only TypeScript/JavaScript files (.ts, .tsx, .js, .jsx) are supported.`
    );
  }

  // undefined means the file could not be read; an empty string is a readable
  // but empty file, which parses fine to an empty source (no false error).
  const text = ts.sys.readFile(filePath);
  if (text === undefined) {
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
