import ts from 'typescript';
import { createRequire } from 'node:module';
import path from 'node:path';
import { staticStringValue } from '../helpers/ast.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationCoverage, ValidationIssue } from '../types.js';

const require = createRequire(import.meta.url);

export type ThemeVariantMap = Map<string, Map<string, string[]>>;

// Resolves a JSX tag *as written* (including an alias, `{ Menu as M }`) to
// the name it was imported under from `@marigold/components`. Deliberately
// NOT gated on `@marigold/components` registry membership (unlike
// `buildMarigoldTagResolver` in helpers/components.ts): `themeVariants` — the
// actual source of truth here — is derived from theme-rui's own build output
// (`dist/appearances.cjs`), a separate data source from the components
// registry, so gating on the registry would reject a real, themed component
// the registry loader doesn't happen to recognize. The only thing that must
// be checked is origin: is this tag actually imported from
// `@marigold/components` (not a locally declared or third-party component
// sharing the name)?
const buildMarigoldImportResolver = (
  source: ts.SourceFile
): Map<string, string> => {
  const resolver = new Map<string, string>();
  for (const stmt of source.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    if (!ts.isStringLiteral(stmt.moduleSpecifier)) continue;
    if (stmt.moduleSpecifier.text !== '@marigold/components') continue;

    const bindings = stmt.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;

    for (const el of bindings.elements) {
      const originalName = (el.propertyName ?? el.name).text;
      const localName = el.name.text;
      resolver.set(localName, originalName);
    }
  }
  return resolver;
};

let cachedMap: ThemeVariantMap | null = null;
let cachedDir: string | null = null;

// theme-rui's `*.styles.ts` sources define each component's variant/size
// values via `cva(...)`, but they never ship in a published install —
// theme-rui's package.json declares `files: ["dist"]`, and the CLI's primary
// real-world environment IS a published install (an AI agent working in a
// consumer project, not this monorepo). Parsing those sources previously
// meant this check silently found nothing outside the monorepo. theme-rui's
// own build (`scripts/build-appearances.mjs`) already resolves every
// component's variant/size values into `dist/appearances.{cjs,mjs}`
// (published publicly as the `@marigold/theme-rui/appearances` subpath) —
// reading THAT instead means this check actually works in the CLI's primary
// environment, and moves the responsibility for correctly resolving cva
// variants (including compoundVariants, object-of-cva internal slots, etc.)
// onto theme-rui's own build script rather than re-implementing it here.
// `require`d directly by resolved path (not the package specifier) so a
// `--theme-path` override pointing at a different theme-rui build works the
// same way auto-resolution does. The CJS build, not the ESM one, so this
// stays a synchronous function like every other technical checker.
type Appearances = Record<string, Record<string, string[]>>;

export const loadThemeVariants = (themeDir: string): ThemeVariantMap => {
  const resolved = path.resolve(themeDir);
  if (cachedMap && cachedDir === resolved) return cachedMap;

  const result: ThemeVariantMap = new Map();

  // Degrades gracefully: a bad themePath, a pre-appearances-build theme-rui,
  // or a malformed dist yields an empty variant map rather than throwing out
  // of the technical phase. The theme-variant check is a warning-level
  // source; losing it must never take down the registry-independent checks
  // (compiler, section-header) too.
  try {
    const appearancesPath = path.join(resolved, 'dist', 'appearances.cjs');
    const mod = require(appearancesPath) as { appearances?: Appearances };
    for (const [componentName, dims] of Object.entries(mod.appearances ?? {})) {
      const dimMap = new Map<string, string[]>();
      for (const [dimName, values] of Object.entries(dims)) {
        if (Array.isArray(values) && values.length > 0) {
          dimMap.set(dimName, values);
        }
      }
      if (dimMap.size > 0) result.set(componentName, dimMap);
    }
  } catch {
    // themePath vanished, is unreadable, predates the appearances build
    // output, or is malformed — return whatever was gathered (empty).
  }

  cachedMap = result;
  cachedDir = resolved;
  return result;
};

export const validateThemeVariants = (
  filePath: string,
  themeDir: string,
  coverage?: ValidationCoverage
): ValidationIssue[] => {
  const source = parseSource(filePath);

  const themeVariants = loadThemeVariants(themeDir);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];
  // Only treat a tag as a Marigold component when it is actually imported
  // from @marigold/components. `themeVariants` is keyed by the component's
  // real name (from theme-rui's `dist/appearances.cjs`), so a bare
  // `themeVariants.get(tag.text)` lookup — with no origin check — false-
  // positives on a locally-declared component sharing a Marigold name (e.g.
  // a project's own `<Menu variant="...">` with an unrelated prop contract),
  // and silently misses an aliased Marigold import.
  const resolver = buildMarigoldImportResolver(source);

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (!ts.isIdentifier(tag)) {
        ts.forEachChild(node, visit);
        return;
      }

      const componentName = tag.text;
      const original = resolver.get(componentName);
      const dimensions = original ? themeVariants.get(original) : undefined;
      if (!dimensions) {
        ts.forEachChild(node, visit);
        return;
      }

      for (const attr of node.attributes.properties) {
        if (!ts.isJsxAttribute(attr)) continue;
        if (!ts.isIdentifier(attr.name)) continue;
        const propName = attr.name.text;

        const validValues = dimensions.get(propName);
        if (!validValues || validValues.length === 0) continue;

        const value = staticStringValue(attr);
        if (value === undefined) {
          if (coverage) coverage.dynamicValuesSkipped++;
          continue;
        }
        if (coverage) coverage.staticValuesChecked++;

        if (!validValues.includes(value)) {
          const { line, character } = source.getLineAndCharacterOfPosition(
            attr.getStart(source)
          );
          issues.push({
            type: 'style',
            severity: 'warning',
            source: 'theme-variant-validator',
            component: componentName,
            message: `<${componentName}> ${propName}="${value}" does not exist in the theme.`,
            suggestion: `Valid ${propName} values: ${validValues.join(', ')}.`,
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: { prop: propName, used: value, validValues },
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(source);
  return issues;
};
