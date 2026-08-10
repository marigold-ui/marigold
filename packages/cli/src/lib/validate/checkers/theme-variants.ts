import ts from 'typescript';
import { createRequire } from 'node:module';
import path from 'node:path';
import { staticStringValue } from '../helpers/ast.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationCoverage, ValidationIssue } from '../types.js';

const require = createRequire(import.meta.url);

export type ThemeVariantMap = Map<string, Map<string, string[]>>;

// Resolves a JSX tag as written (including aliases) to its imported name.
// Deliberately NOT gated on registry membership, unlike
// buildMarigoldTagResolver: the source of truth here is theme-rui's own
// appearances build, a separate data source, so gating on the components
// registry would reject a real themed component it doesn't recognize. Only
// origin matters — is this tag actually imported from @marigold/components?
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

// theme-rui's `*.styles.ts` sources define variants via `cva(...)` but never
// ship (`files: ["dist"]`), and the CLI's primary environment is a published
// install. theme-rui's own build already resolves them into
// `dist/appearances.cjs`, so reading that works in a consumer project and
// keeps cva resolution (compoundVariants, slots) theme-rui's responsibility.
// `require`d by resolved path so a `--theme-path` override behaves like
// auto-resolution, and CJS so this stays synchronous like every other
// technical checker.
//
// Known gap: build-appearances.mjs reads only each component's `variants`
// object, not values appearing solely in a `compoundVariants` rule. No current
// component has one — worth a follow-up in theme-rui if that changes.
type Appearances = Record<string, Record<string, string[]>>;

export const loadThemeVariants = (themeDir: string): ThemeVariantMap => {
  const resolved = path.resolve(themeDir);
  if (cachedMap && cachedDir === resolved) return cachedMap;

  const result: ThemeVariantMap = new Map();

  // A bad themePath or malformed dist yields an empty variant map rather than
  // throwing: this is a warning-level source, and losing it must not take the
  // registry-independent checks down with it.
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
    // no-op: fall through to whatever was gathered (empty)
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
  // Only tags actually imported from @marigold/components. `themeVariants` is
  // keyed by real component name, so a bare lookup would false-positive on a
  // local `<Menu variant="...">` and miss an aliased Marigold import.
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
