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
    (ts.isStringLiteral(init.expression) ||
      ts.isNoSubstitutionTemplateLiteral(init.expression))
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

// A JSX identifier names a component (not an HTML/DOM element) when it starts
// with an uppercase letter — the same convention the DOM enforces for tags.
export const isPascalCase = (name: string): boolean =>
  name.length > 0 &&
  name[0] === name[0].toUpperCase() &&
  name[0] !== name[0].toLowerCase();

// A spread attribute (`<X {...props} />`) can carry props that cannot be
// resolved statically — a forwarded label, id, header or children. Checks use
// this to skip an element with a spread rather than emit a false positive.
export const hasSpreadAttribute = (attrs: ts.JsxAttributes): boolean =>
  attrs.properties.some(ts.isJsxSpreadAttribute);

const isOpaqueExpressionChild = (child: ts.JsxChild): boolean =>
  ts.isJsxExpression(child) &&
  child.expression !== undefined &&
  !ts.isArrowFunction(child.expression) &&
  !ts.isFunctionExpression(child.expression);

// A JSX fragment child (`<>{...}</>`) has no tag of its own to hide the
// opaque expression behind, so its own children must be checked the same way
// — recursively, in case of a fragment nested inside a fragment.
const hasOpaqueChildIn = (children: ts.NodeArray<ts.JsxChild>): boolean =>
  children.some(
    child =>
      isOpaqueExpressionChild(child) ||
      (ts.isJsxFragment(child) && hasOpaqueChildIn(child.children))
  );

// A child whose content is an opaque runtime expression — `{children}`,
// `{renderBody()}`, `{items.map(...)}` — may carry sub-components at runtime, so
// the absence of a static sub-component is not provable. Inline render functions
// (`{() => <X.Y/>}`) are NOT opaque: their body is part of the AST. A fragment
// wrapping such an expression (`<>{items.map(...)}</>` — an idiomatic pattern,
// e.g. inside `<Table>`) is equally opaque, since the fragment itself carries
// no sub-components.
export const hasOpaqueDynamicChild = (element: ts.JsxElement): boolean =>
  hasOpaqueChildIn(element.children);

const EVENT_TARGET_PROPERTIES = new Set([
  'value',
  'checked',
  'selectedOptions',
]);

/**
 * Recursively checks whether an AST subtree contains a `<paramName>.target.value`
 * (or `.checked`/`.selectedOptions`) access — the telltale sign that a handler
 * treats its argument as a DOM event. The chain is bound to `paramName` (the
 * handler's first parameter), so a `.target.value` on some *other* object in the
 * body — a closed-over event, a helper's return value — does NOT trigger a false
 * positive. This matters because the finding is reported as an error.
 */
export const containsEventTargetAccess = (
  node: ts.Node,
  paramName: string
): boolean => {
  if (
    ts.isPropertyAccessExpression(node) &&
    EVENT_TARGET_PROPERTIES.has(node.name.text) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'target' &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === paramName
  ) {
    return true;
  }

  return (
    ts.forEachChild(node, child =>
      containsEventTargetAccess(child, paramName)
    ) ?? false
  );
};
