import ts from 'typescript';
import path from 'node:path';
import { isMarigoldComponent } from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// A flow layout (Stack/Inline/Columns/Grid) earns its place only when it
// arranges two or more children — its job is to space/flow siblings. With a
// single child it is a wrapper that does nothing; the element should be
// rendered directly. The single-child wrappers Inset/Center/Breakout/Aspect are
// the exception (wrapping one child is their purpose) and are NOT in this set.
const FLOW_LAYOUTS = new Set(['Stack', 'Inline', 'Columns', 'Grid']);

export const validateLayoutUsage = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const check = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (
        ts.isIdentifier(tag) &&
        FLOW_LAYOUTS.has(tag.text) &&
        isMarigoldComponent(tag.text)
      ) {
        let elementChildren = 0;
        let hasDynamicChild = false;
        for (const child of node.children) {
          if (ts.isJsxText(child)) {
            if (child.text.trim() !== '') elementChildren++;
          } else if (
            ts.isJsxElement(child) ||
            ts.isJsxSelfClosingElement(child) ||
            ts.isJsxFragment(child)
          ) {
            elementChildren++;
          } else if (ts.isJsxExpression(child) && child.expression) {
            // {items.map(...)}, {children}, {cond && ...} expand to an unknown
            // number of children — cannot count statically, so skip the layout
            // to stay false-positive-free.
            hasDynamicChild = true;
          }
        }

        if (!hasDynamicChild && elementChildren === 1) {
          const { line, character } = source.getLineAndCharacterOfPosition(
            node.openingElement.getStart(source)
          );
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'layout-usage',
            component: tag.text,
            message: `<${tag.text}> wraps a single child. A flow layout earns its place only with two or more children; with one child it adds a wrapper that does nothing.`,
            suggestion: `Render the child directly instead of wrapping it in <${tag.text}>. For single-child spacing use Inset, Center, Breakout or Aspect.`,
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: { layout: tag.text, childCount: elementChildren },
          });
        }
      }
    }
    ts.forEachChild(node, check);
  };

  check(source);
  return issues;
};
