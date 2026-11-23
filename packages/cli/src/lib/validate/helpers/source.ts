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

// Throws a readable error unless the file is TypeScript or JavaScript. The
// extension is compared case-insensitively (`Button.TSX` is fine).
export const assertSupportedFile = (filePath: string): void => {
  const ext = path.extname(filePath).toLowerCase();
  if (SUPPORTED_EXTENSIONS.has(ext)) return;
  const supported = [...SUPPORTED_EXTENSIONS].join(', ');
  throw new Error(
    ext
      ? `Unsupported file type "${ext}". Only TypeScript/JavaScript files (${supported}) are supported.`
      : `Unsupported file type: "${path.basename(filePath)}" has no extension. Only TypeScript/JavaScript files (${supported}) are supported.`
  );
};

export const parseSource = (
  filePath: string,
  scriptKind: ts.ScriptKind = ts.ScriptKind.TSX
): ts.SourceFile => {
  assertSupportedFile(filePath);

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
