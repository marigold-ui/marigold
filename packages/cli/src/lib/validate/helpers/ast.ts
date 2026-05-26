import ts from 'typescript';

export const staticStringValue = (
  attr: ts.JsxAttribute
): string | undefined => {
  const init = attr.initializer;
  if (!init) return undefined;
  if (ts.isStringLiteral(init)) return init.text;
  if (
    ts.isJsxExpression(init) &&
    init.expression &&
    ts.isStringLiteral(init.expression)
  ) {
    return init.expression.text;
  }
  return undefined;
};

export const hasAttrPresent = (
  attrs: ts.JsxAttributes,
  name: string
): boolean =>
  attrs.properties.some(
    p => ts.isJsxAttribute(p) && ts.isIdentifier(p.name) && p.name.text === name
  );

const EVENT_TARGET_PROPERTIES = new Set([
  'value',
  'checked',
  'selectedOptions',
]);

/**
 * Recursively checks whether an AST subtree contains a property access chain
 * matching `<expr>.target.value`, `<expr>.target.checked`, or
 * `<expr>.target.selectedOptions` — the telltale sign of a DOM event handler.
 */
export const containsEventTargetAccess = (node: ts.Node): boolean => {
  if (
    ts.isPropertyAccessExpression(node) &&
    EVENT_TARGET_PROPERTIES.has(node.name.text) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'target'
  ) {
    return true;
  }

  return ts.forEachChild(node, containsEventTargetAccess) ?? false;
};
