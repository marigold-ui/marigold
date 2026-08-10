import ts from 'typescript';
import path from 'node:path';
import { hasAttrPresent, hasSpreadAttribute } from '../helpers/ast.js';
import {
  buildMarigoldTagResolver,
  isMarigoldSubComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// Keyed collection items pass their `id` to onAction/onSelectionChange so a
// handler can identify the activated item. A missing id doesn't break rendering
// — React Aria auto-generates keys for static collections — so this is a
// warning.
//
// The set is curated, NOT schema-derived: almost every component accepts a DOM
// `id`, so "declares an id prop" can't tell a keyed item (Menu.Item) from a
// positional sub-component (Table.Cell) or a container (Tag.Group), and that
// signal false-positived on exactly those. Breadcrumbs.Item is excluded — a
// breadcrumb is identified by `href`, not a selectable key.
const KEYED_COLLECTION_ITEMS = new Set([
  'ActionMenu.Item',
  'Autocomplete.Option',
  'ComboBox.Option',
  'ListBox.Item',
  'Menu.Item',
  'Select.Option',
  'SelectList.Item',
  'Tabs.Item',
]);

const ID_PROP = 'id';
const KEY_PROP = 'key';
const ITEMS_PROP = 'items';

// Walk up to the nearest enclosing <parentName> JSX element. If it carries an
// `items` prop, its children come from data (id flows from the item record),
// so a missing literal `id` on the child is not a defect — skip.
const collectionContainerHasItems = (
  element: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
  parentName: string
): boolean => {
  let node: ts.Node | undefined = element.parent;
  while (node) {
    const opening = ts.isJsxElement(node)
      ? node.openingElement
      : ts.isJsxSelfClosingElement(node)
        ? node
        : undefined;
    if (opening) {
      const tag = opening.tagName;
      if (ts.isIdentifier(tag) && tag.text === parentName) {
        return hasAttrPresent(opening.attributes, ITEMS_PROP);
      }
    }
    node = node.parent;
  }
  return false;
};

export const validateCollectionId = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];
  // Only tags actually imported from @marigold/components, resolved through
  // aliases. Without this a local `<X.Item>` false-positives and an aliased
  // Marigold one is skipped. Mirrors the composition checker's origin guard.
  const resolver = buildMarigoldTagResolver(source);

  const check = (node: ts.Node): void => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression)
      ) {
        const parent = tag.expression.text;
        const sub = tag.name.text;
        const qualified = `${parent}.${sub}`;
        const originalParent = resolver.get(parent);
        const originalQualified = originalParent
          ? `${originalParent}.${sub}`
          : undefined;

        // A spread ({...props}) may carry the id — cannot resolve statically.
        const hasSpread = hasSpreadAttribute(node.attributes);

        if (
          originalParent !== undefined &&
          originalQualified !== undefined &&
          KEYED_COLLECTION_ITEMS.has(originalQualified) &&
          isMarigoldSubComponent(originalParent, sub) &&
          !hasSpread &&
          !hasAttrPresent(node.attributes, ID_PROP) &&
          !hasAttrPresent(node.attributes, KEY_PROP) &&
          !collectionContainerHasItems(node, parent)
        ) {
          const start = node.getStart(source);
          const { line, character } =
            source.getLineAndCharacterOfPosition(start);
          issues.push({
            type: 'technical',
            severity: 'warning',
            source: 'collection-id',
            component: qualified,
            message: `<${qualified}> has no "${ID_PROP}". Keyed collection items should carry a stable id; selection and action handlers (onAction/onSelectionChange) receive it to identify the activated item.`,
            suggestion: `Add a unique id, e.g. <${qualified} ${ID_PROP}="…">.`,
            location: {
              file: relFile,
              line: line + 1,
              column: character + 1,
            },
            details: {
              subComponent: qualified,
              missingProp: ID_PROP,
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
