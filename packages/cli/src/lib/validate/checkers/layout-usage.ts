import ts from 'typescript';
import path from 'node:path';
import { buildMarigoldTagResolver } from '../helpers/components.js';
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
  // Only treat a tag as a Marigold flow layout when it is actually imported
  // from @marigold/components. A locally declared or third-party component
  // that happens to share a layout's name must not be held to this rule, and
  // an aliased import (`{ Stack as S }`) must still be checked.
  const resolver = buildMarigoldTagResolver(source);

  const check = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      const original = ts.isIdentifier(tag)
        ? resolver.get(tag.text)
        : undefined;
      if (
        ts.isIdentifier(tag) &&
        original !== undefined &&
        FLOW_LAYOUTS.has(original)
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
