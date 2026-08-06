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

// Filtered when the file compiles outside a full project context, where
// @marigold/components can't be resolved. Never fires inside the monorepo.
// Trade-off: a mistyped import path is swallowed too, acceptable because
// design-system-usage catches typo'd components without module resolution.
const ENVIRONMENT_ERROR_CODES = new Set([
  2307, // Cannot find module
  2503, // Cannot find namespace
  2875, // JSX module path not found
  // Config-dependent, not Marigold violations: these follow the consuming
  // project's tsconfig, which validate doesn't adopt. Unlike the codes above,
  // 5097 has no secondary backstop — it's dropped purely because a
  // `.tsx`-extension import is a config choice, never a defect.
  5097, // Import path ends with .ts/.tsx (needs allowImportingTsExtensions)
  2591, // Cannot find name 'process' etc. (needs @types/node); NOT 2304, so a
  //       genuine undefined name is still reported.
  2882, // Cannot find module/type decls for side-effect import (e.g. a .css)
]);

// Strip TS suppress directives so the compiler always sees real type errors,
// even in AI-generated files that use them as a crutch.
//
// `^[ \t]*`, not `^\s*`: `\s` matches `\n` too, so a directive preceded by a
// blank line would swallow that line's newline and shift every following
// diagnostic up by one. `[ \t]*` absorbs only same-line indentation, keeping
// the line count exactly as written.
const stripTsSuppressDirectives = (text: string): string =>
  text.replace(/^[ \t]*\/\/\s*@ts-(?:nocheck|ignore|expect-error)[^\n]*/gm, '');

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

  // Only report diagnostics located IN the target file (or global option
  // diagnostics with no file). `validate <file>` should surface issues in that
  // file — not the internal errors of every local module it imports, which the
  // program also typechecks. This keeps the report scoped to the file the user
  // asked about instead of flooding it with its dependencies' problems.
  const target = path.resolve(filePath);
  const issues = diagnostics
    .filter(d => !d.file || path.resolve(d.file.fileName) === target)
    .filter(d => !ENVIRONMENT_ERROR_CODES.has(d.code))
    .map(d => diagnosticToIssue(d, filePath));
  return { ok: issues.length === 0, issues };
};
