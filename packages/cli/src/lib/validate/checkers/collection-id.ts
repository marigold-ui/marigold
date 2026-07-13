import ts from 'typescript';
import path from 'node:path';
import { hasAttrPresent, hasSpreadAttribute } from '../helpers/ast.js';
import { isMarigoldSubComponent } from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

// React Aria keyed collection items deliver their `id` to onAction /
// onSelectionChange so a handler can identify the activated item (Marigold /
// React Aria convention; the docs require an id on these items). A missing id
// does NOT hard-break rendering — React Aria auto-generates keys for static
// collections, and items with their own onPress still work — so this is a
// WARNING, not an error.
//
// The set below is curated, NOT schema-derived. Almost every component accepts
// a DOM `id`, so "the sub-component declares an id prop" cannot tell a keyed
// collection item (Menu.Item) apart from a positional sub-component (Table.Cell)
// or a container (Tag.Group) — that signal produced false positives on exactly
// those. Only the genuine keyed-item sub-components belong here, verified
// against the Marigold component source. This makes the check design-system-
// specific (part of the curated remainder), which is the honest classification.
// Breadcrumbs.Item is intentionally excluded: a breadcrumb is a navigation link
// identified by its `href`, not a selectable keyed item (its props require
// `href`, not `id`).
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

        // A spread ({...props}) may carry the id — cannot resolve statically.
        const hasSpread = hasSpreadAttribute(node.attributes);

        if (
          KEYED_COLLECTION_ITEMS.has(qualified) &&
          isMarigoldSubComponent(parent, sub) &&
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
