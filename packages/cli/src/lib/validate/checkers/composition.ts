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

// Per-component optional sub-components. The type system doesn't encode
// "required vs optional sub-component" semantics, so this is explicit.
// Sub-components NOT listed here are treated as required.
const OPTIONAL_SUBS_BY_COMPONENT: Record<string, Set<string>> = {
  Accordion: new Set(['Section', 'Group']),
  AppShell: new Set(['Sidebar', 'Footer', 'Header']),
  Calendar: new Set(['Header']),
  DatePicker: new Set(['Group']),
  Menu: new Set(['Section', 'Separator', 'GroupLabel']),
  NavigationMenu: new Set(['Start', 'Middle', 'End', 'Separator']),
  Select: new Set(['Section', 'Group']),
  SplitButton: new Set(['Toggle']),
  Table: new Set(['Header', 'EditableCell', 'Section', 'Group']),
  Tabs: new Set(['Group']),
  TagGroup: new Set(['Group']),
};

const GLOBAL_OPTIONAL = new Set(['Separator', 'Group', 'Section']);

const isOptionalSub = (component: string, sub: string): boolean =>
  GLOBAL_OPTIONAL.has(sub) ||
  (OPTIONAL_SUBS_BY_COMPONENT[component]?.has(sub) ?? false);

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
        const missing = knownSubs.filter(
          s => !counts.has(s) && !isOptionalSub(componentName, s)
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
