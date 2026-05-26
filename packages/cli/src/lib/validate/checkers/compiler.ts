import ts from 'typescript';
import path from 'node:path';
import type { ValidationIssue } from '../types.js';

const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  noImplicitAny: false,
  esModuleInterop: true,
  skipLibCheck: true,
  noEmit: true,
  allowSyntheticDefaultImports: true,
  resolveJsonModule: true,
  isolatedModules: true,
};

// Filtered when the file is compiled outside a full project context (e.g.
// standalone AI-generated files where @marigold/components can't be resolved).
// Empirically verified: never fires inside the monorepo (workspace links resolve).
const ENVIRONMENT_ERROR_CODES = new Set([
  2307, // Cannot find module
  2503, // Cannot find namespace
  2875, // JSX module path not found
]);

// Strip TS suppress directives so the compiler always sees real type errors,
// even in AI-generated files that use them as a crutch.
const stripTsSuppressDirectives = (text: string): string =>
  text.replace(/^\s*\/\/\s*@ts-(?:nocheck|ignore|expect-error)[^\n]*/gm, '');

const diagnosticToIssue = (
  diagnostic: ts.Diagnostic,
  rootFile: string
): ValidationIssue => {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  const file = diagnostic.file;
  let location: ValidationIssue['location'];
  if (file && diagnostic.start !== undefined) {
    const { line, character } = file.getLineAndCharacterOfPosition(
      diagnostic.start
    );
    location = {
      file: path.relative(process.cwd(), file.fileName),
      line: line + 1,
      column: character + 1,
    };
  }
  return {
    type: 'technical',
    severity: 'error',
    source: 'compiler',
    component: 'TypeScript',
    message: `TS${diagnostic.code}: ${message}`,
    suggestion:
      'Fix the TypeScript error reported by the compiler. The exact location is included in the issue location field.',
    location: location ?? {
      file: path.relative(process.cwd(), rootFile),
      line: 1,
      column: 1,
    },
  };
};

export type CompileResult = {
  ok: boolean;
  issues: ValidationIssue[];
};

export const compileFile = (
  filePath: string,
  compilerOptions: ts.CompilerOptions = DEFAULT_COMPILER_OPTIONS
): CompileResult => {
  const originalText = ts.sys.readFile(filePath) ?? '';
  const text = stripTsSuppressDirectives(originalText);

  const host = ts.createCompilerHost(compilerOptions);
  if (text !== originalText) {
    const origGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    ) => {
      if (path.resolve(fileName) === path.resolve(filePath)) {
        return ts.createSourceFile(fileName, text, languageVersion, true);
      }
      return origGetSourceFile(
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile
      );
    };
  }

  const program = ts.createProgram({
    rootNames: [filePath],
    options: compilerOptions,
    host,
  });

  const diagnostics = [
    ...program.getSyntacticDiagnostics(),
    ...program.getSemanticDiagnostics(),
  ];

  const issues = diagnostics
    .filter(d => !ENVIRONMENT_ERROR_CODES.has(d.code))
    .map(d => diagnosticToIssue(d, filePath));
  return { ok: issues.length === 0, issues };
};
