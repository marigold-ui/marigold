import ts from 'typescript';
import path from 'node:path';
import {
  getSubComponents,
  isCompoundComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

const collectSubComponentUsages = (
  node: ts.Node,
  parentName: string,
  compoundParents: Set<string>,
  counts: Map<string, number>
): void => {
  const checkTag = (tagName: ts.JsxTagNameExpression): void => {
    if (
      ts.isPropertyAccessExpression(tagName) &&
      ts.isIdentifier(tagName.expression) &&
      tagName.expression.text === parentName
    ) {
      const sub = tagName.name.text;
      counts.set(sub, (counts.get(sub) ?? 0) + 1);
    }
  };

  if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
    checkTag(node.tagName);
  }

  if (ts.isJsxElement(node)) {
    const tag = node.openingElement.tagName;
    if (
      ts.isIdentifier(tag) &&
      compoundParents.has(tag.text) &&
      tag.text !== parentName
    ) {
      return;
    }
  }

  ts.forEachChild(node, child =>
    collectSubComponentUsages(child, parentName, compoundParents, counts)
  );
};

// Sub-components that are valid to omit — they provide optional layout
// slots, grouping, or advanced features rather than structural requirements.
// This can't be derived from TypeScript types because the type system
// doesn't encode "required vs optional sub-component" semantics.
const OPTIONAL_SUBS = new Set([
  'Section',
  'Group',
  'EditableCell',
  'Header',
  'Sidebar',
  'Footer',
  'Separator',
  'Toggle',
  'GroupLabel',
  'Start',
  'Middle',
  'End',
]);

const collectAncestorSubComponents = (
  node: ts.Node,
  parentName: string,
  counts: Map<string, number>
): void => {
  let current = node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      const tag = current.openingElement.tagName;
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression) &&
        tag.expression.text === parentName
      ) {
        const sub = tag.name.text;
        counts.set(sub, (counts.get(sub) ?? 0) + 1);
      }
    }
    current = current.parent;
  }
};

const ITERATION_METHODS = new Set(['map', 'filter', 'flatMap', 'reduce']);

const isIterationCall = (expr: ts.Expression): boolean => {
  if (ts.isCallExpression(expr)) {
    const callee = expr.expression;
    if (
      ts.isPropertyAccessExpression(callee) &&
      ITERATION_METHODS.has(callee.name.text)
    ) {
      return true;
    }
    // Chained calls: items.filter(...).map(...)
    if (ts.isPropertyAccessExpression(callee)) {
      return isIterationCall(callee.expression);
    }
  }
  return false;
};

const hasDynamicChildren = (element: ts.JsxElement): boolean =>
  element.children.some(
    child =>
      ts.isJsxExpression(child) &&
      child.expression !== undefined &&
      (ts.isIdentifier(child.expression) || isIterationCall(child.expression))
  );

export const validateComposition = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);

  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const compoundParents = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && isCompoundComponent(tag.text)) {
        compoundParents.add(tag.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  const check = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;

      if (ts.isIdentifier(tag) && isCompoundComponent(tag.text)) {
        const componentName = tag.text;
        const knownSubs = getSubComponents(componentName);
        if (!knownSubs || knownSubs.length === 0) {
          ts.forEachChild(node, check);
          return;
        }

        const isDynamic = hasDynamicChildren(node);

        const counts = new Map<string, number>();
        collectAncestorSubComponents(node, componentName, counts);
        for (const child of node.children) {
          if (isDynamic && ts.isJsxExpression(child)) continue;
          collectSubComponentUsages(
            child,
            componentName,
            compoundParents,
            counts
          );
        }

        const { line, character } = source.getLineAndCharacterOfPosition(
          node.openingElement.getStart(source)
        );
        const location = {
          file: relFile,
          line: line + 1,
          column: character + 1,
        };

        const found = [...counts.keys()];
        const missing = knownSubs.filter(
          s => !counts.has(s) && !OPTIONAL_SUBS.has(s)
        );

        if (found.length === 0 && !isDynamic) {
          issues.push({
            type: 'technical',
            severity: 'error',
            source: 'composition-validator',
            component: componentName,
            message: `<${componentName}> is used without any of its sub-components.`,
            suggestion: `Use compound children: ${knownSubs.map(s => `<${componentName}.${s}>`).join(', ')}.`,
            location,
            details: { expected: knownSubs, found: [] },
          });
        } else if (missing.length > 0) {
          const dynamicNote = isDynamic
            ? ' Note: dynamic children could not be fully analyzed.'
            : '';
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'composition-validator',
            component: componentName,
            message: `<${componentName}> is missing sub-components: ${missing.map(m => `<${componentName}.${m}>`).join(', ')}.${dynamicNote}`,
            suggestion: isDynamic
              ? `If the missing sub-components are provided via the dynamic children expression, this warning can be ignored.`
              : `Consider adding the missing sub-components for complete functionality.`,
            location,
            details: {
              expected: knownSubs,
              found,
              missing,
              ...(isDynamic && { dynamicChildren: true }),
            },
          });
        }
      }
    }

    ts.forEachChild(node, check);
  };

  check(source);
  return issues;
};
