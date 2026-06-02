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

// A compound that exposes a collection-item sub-component renders a variable
// number of those children by design (a table has many columns, a select many
// options). For such components, repetition is correct usage — duplicate
// warnings would be false positives. This is derived from the schema's own
// sub-component names rather than a per-component hardcoded list: the item
// vocabulary (Item, Option, Row, Column, Cell, Tab, TabPanel) is shared across
// React Aria collections.
const COLLECTION_ITEM_INDICATORS = new Set([
  'Item',
  'Option',
  'Row',
  'Column',
  'Cell',
  'Tab',
  'TabPanel',
]);

const isCollectionCompound = (knownSubs: string[]): boolean =>
  knownSubs.some(s => COLLECTION_ITEM_INDICATORS.has(s));

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
    } else if (ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (ts.isIdentifier(tag) && isCompoundComponent(tag.text)) {
        compoundParents.add(tag.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);

  const getTagInfo = (
    node: ts.Node
  ): { tag: ts.Identifier; startPos: number } | undefined => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag))
        return { tag, startPos: node.openingElement.getStart(source) };
    } else if (ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (ts.isIdentifier(tag)) return { tag, startPos: node.getStart(source) };
    }
    return undefined;
  };

  const check = (node: ts.Node): void => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const info = getTagInfo(node);

      if (info && isCompoundComponent(info.tag.text)) {
        const componentName = info.tag.text;
        const knownSubs = getSubComponents(componentName);
        if (!knownSubs || knownSubs.length === 0) {
          ts.forEachChild(node, check);
          return;
        }

        const isSelfClosing = ts.isJsxSelfClosingElement(node);
        const isDynamic =
          !isSelfClosing && hasDynamicChildren(node as ts.JsxElement);

        const counts = new Map<string, number>();
        collectAncestorSubComponents(node, componentName, counts);
        if (!isSelfClosing) {
          for (const child of (node as ts.JsxElement).children) {
            if (isDynamic && ts.isJsxExpression(child)) continue;
            collectSubComponentUsages(
              child,
              componentName,
              compoundParents,
              counts
            );
          }
        }

        const { line, character } = source.getLineAndCharacterOfPosition(
          info.startPos
        );
        const location = {
          file: relFile,
          line: line + 1,
          column: character + 1,
        };

        const found = [...counts.keys()];
        const collectionLike = isCollectionCompound(knownSubs);

        // Only a completely empty compound is an unambiguous error. Partial
        // "missing sub-component" findings are too often optional to flag
        // reliably (e.g. a Dialog opened programmatically needs no Trigger).
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
        }

        // Duplicate-instance warnings only make sense for singleton slots
        // (e.g. two <Dialog.Title>). Collection compounds repeat sub-components
        // by design, so suppress the warning there to avoid false positives.
        if (!collectionLike) {
          const duplicates = [...counts.entries()].filter(([, n]) => n > 1);
          for (const [sub, count] of duplicates) {
            issues.push({
              type: 'technical',
              severity: 'warning',
              source: 'composition-validator',
              component: componentName,
              message: `<${componentName}.${sub}> is used ${count} times. Most compound components expect a single instance of each sub-component.`,
              suggestion: `Verify that multiple <${componentName}.${sub}> instances are intentional.`,
              location,
              details: { subComponent: sub, count },
            });
          }
        }
      }
    }

    ts.forEachChild(node, check);
  };

  check(source);
  return issues;
};
