import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { staticStringValue } from '../helpers/ast.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationCoverage, ValidationIssue } from '../types.js';

export type ThemeVariantMap = Map<string, Map<string, string[]>>;

// Resolves a JSX tag *as written* (including an alias, `{ Menu as M }`) to
// the name it was imported under from `@marigold/components`. Deliberately
// NOT gated on `@marigold/components` registry membership (unlike
// `buildMarigoldTagResolver` in helpers/components.ts): `themeVariants` — the
// actual source of truth here — is derived from the theme package's
// `*.styles.ts` files, a separate data source from the components registry,
// so gating on the registry would reject a real, themed component the
// registry loader doesn't happen to recognize. The only thing that must be
// checked is origin: is this tag actually imported from `@marigold/components`
// (not a locally declared or third-party component sharing the name)?
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

const extractFromCva = (
  componentName: string,
  callExpr: ts.CallExpression,
  result: ThemeVariantMap
): void => {
  const arg = callExpr.arguments[0];
  if (!arg || !ts.isObjectLiteralExpression(arg)) return;

  const variantsProp = arg.properties.find(
    (p): p is ts.PropertyAssignment =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === 'variants'
  );
  if (!variantsProp || !ts.isObjectLiteralExpression(variantsProp.initializer))
    return;

  let existing = result.get(componentName);
  if (!existing) {
    existing = new Map();
    result.set(componentName, existing);
  }

  for (const dim of variantsProp.initializer.properties) {
    if (!ts.isPropertyAssignment(dim)) continue;
    const dimName = ts.isIdentifier(dim.name) ? dim.name.text : undefined;
    if (!dimName) continue;
    if (!ts.isObjectLiteralExpression(dim.initializer)) continue;

    const values = dim.initializer.properties
      .filter(ts.isPropertyAssignment)
      .map(p => {
        if (ts.isIdentifier(p.name)) return p.name.text;
        if (ts.isStringLiteral(p.name)) return p.name.text;
        return undefined;
      })
      .filter((v): v is string => v !== undefined);

    const existingValues = existing.get(dimName) ?? [];
    const merged = [...new Set([...existingValues, ...values])];
    existing.set(dimName, merged);
  }

  // Union in values that only appear inside `compoundVariants`. A value valid
  // only in a compound rule (e.g. variant 'ghost' used in a compoundVariant but
  // not listed under `variants.variant`) would otherwise be wrongly flagged as
  // "not in theme". We ONLY enlarge the value set of an ALREADY-KNOWN dimension;
  // a key that is not already a variant dimension is ignored (we never invent a
  // new dimension from compoundVariants alone), and `class`/`className` keys are
  // skipped since they hold the applied styles, not variant values.
  const compoundProp = arg.properties.find(
    (p): p is ts.PropertyAssignment =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === 'compoundVariants'
  );
  if (compoundProp && ts.isArrayLiteralExpression(compoundProp.initializer)) {
    for (const element of compoundProp.initializer.elements) {
      if (!ts.isObjectLiteralExpression(element)) continue;
      for (const prop of element.properties) {
        if (!ts.isPropertyAssignment(prop)) continue;
        const key = ts.isIdentifier(prop.name)
          ? prop.name.text
          : ts.isStringLiteral(prop.name)
            ? prop.name.text
            : undefined;
        if (!key || key === 'class' || key === 'className') continue;
        if (!existing.has(key)) continue; // only enlarge known dimensions

        const newValues: string[] = [];
        if (ts.isStringLiteral(prop.initializer)) {
          newValues.push(prop.initializer.text);
        } else if (ts.isArrayLiteralExpression(prop.initializer)) {
          for (const item of prop.initializer.elements) {
            if (ts.isStringLiteral(item)) newValues.push(item.text);
          }
        }
        if (newValues.length === 0) continue;

        const existingValues = existing.get(key) ?? [];
        existing.set(key, [...new Set([...existingValues, ...newValues])]);
      }
    }
  }
};

const parseStyleFile = (filePath: string, result: ThemeVariantMap): void => {
  // parseSource returns a SourceFile or throws (unreadable file, bad ext); the
  // caller wraps this in try/catch so one bad `*.styles.ts` degrades to "no
  // variants for that file" instead of aborting the whole technical phase.
  const source = parseSource(filePath, ts.ScriptKind.TS);

  const visit = (node: ts.Node): void => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
        const componentName = decl.name.text;

        // Only the DIRECT `export const X = cva({...})` form maps to a
        // component's JSX-prop variants: the const name is the component and the
        // cva `variants` ARE the props an author sets (e.g. <Button variant>).
        if (ts.isCallExpression(decl.initializer)) {
          const callee = decl.initializer.expression;
          if (ts.isIdentifier(callee) && callee.text === 'cva') {
            extractFromCva(componentName, decl.initializer, result);
          }
        }

        // The object-of-cva form (`export const Menu = { item: cva(...),
        // button: cva(...) }`) describes INTERNAL style slots, not JSX props.
        // Extracting them under the component name merged unrelated style groups
        // and produced a bogus `variant` set, so <Menu variant="ghost"> was
        // wrongly flagged "not in theme". These slot keys are not component-level
        // variant props, so we deliberately SKIP extraction for this form
        // (FP-over-FN tradeoff: those forms expose no JSX variant prop anyway).
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
};

export const loadThemeVariants = (themeDir: string): ThemeVariantMap => {
  const resolved = path.resolve(themeDir);
  if (cachedMap && cachedDir === resolved) return cachedMap;

  const result: ThemeVariantMap = new Map();

  // All theme file I/O below degrades gracefully: a bad themePath, an
  // unreadable directory, or a single unreadable `*.styles.ts` yields an
  // empty/partial variant map rather than throwing out of the technical phase.
  // The theme-variant check is a warning-level source; losing it must never
  // take down the registry-independent checks (compiler, section-header) too.
  try {
    let componentsDir = resolved;
    if (
      fs.existsSync(path.join(resolved, 'src', 'components')) &&
      fs.statSync(path.join(resolved, 'src', 'components')).isDirectory()
    ) {
      componentsDir = path.join(resolved, 'src', 'components');
    }

    const files = fs
      .readdirSync(componentsDir)
      .filter(f => f.endsWith('.styles.ts'));
    for (const file of files) {
      try {
        parseStyleFile(path.join(componentsDir, file), result);
      } catch {
        // Skip this style file (unreadable, race, symlink) and keep going —
        // the other files still contribute their variants.
      }
    }
  } catch {
    // themePath vanished or is unreadable — return whatever we gathered.
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
  // real name (extracted from the theme's *.styles.ts files), so a bare
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
