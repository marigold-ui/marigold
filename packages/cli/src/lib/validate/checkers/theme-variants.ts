import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import { staticStringValue } from '../helpers/ast.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

export type ThemeVariantMap = Map<string, Map<string, string[]>>;

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
};

const parseStyleFile = (filePath: string, result: ThemeVariantMap): void => {
  const source = parseSource(filePath, ts.ScriptKind.TS);
  if (!source) return;

  const visit = (node: ts.Node): void => {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || !decl.initializer) continue;
        const componentName = decl.name.text;

        if (ts.isCallExpression(decl.initializer)) {
          const callee = decl.initializer.expression;
          if (ts.isIdentifier(callee) && callee.text === 'cva') {
            extractFromCva(componentName, decl.initializer, result);
          }
        }

        if (ts.isObjectLiteralExpression(decl.initializer)) {
          for (const prop of decl.initializer.properties) {
            if (!ts.isPropertyAssignment(prop)) continue;
            if (
              ts.isCallExpression(prop.initializer) &&
              ts.isIdentifier(prop.initializer.expression) &&
              prop.initializer.expression.text === 'cva'
            ) {
              extractFromCva(componentName, prop.initializer, result);
            }
          }
        }
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
    parseStyleFile(path.join(componentsDir, file), result);
  }

  cachedMap = result;
  cachedDir = resolved;
  return result;
};

export const validateThemeVariants = (
  filePath: string,
  themeDir: string
): ValidationIssue[] => {
  const source = parseSource(filePath);

  const themeVariants = loadThemeVariants(themeDir);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const visit = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (!ts.isIdentifier(tag)) {
        ts.forEachChild(node, visit);
        return;
      }

      const componentName = tag.text;
      const dimensions = themeVariants.get(componentName);
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
        if (value === undefined) continue;

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
