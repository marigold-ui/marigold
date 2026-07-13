import ts from 'typescript';
import path from 'node:path';
import {
  hasAttrPresent,
  hasOpaqueDynamicChild,
  hasSpreadAttribute,
} from '../helpers/ast.js';
import { parseSource } from '../helpers/source.js';
import type { IssueSeverity, ValidationIssue } from '../types.js';

// Overlay components whose content is not in the DOM until the overlay opens.
// The validate tool renders the page but never activates triggers, so axe-core
// never sees a closed Dialog/Drawer, its `dialog` role, or its title — the
// accessible name simply cannot be checked at runtime. A static check fills
// exactly this gap: each overlay must carry an accessible name via an
// `aria-label`/`aria-labelledby` prop OR an `<X.Title>` child.
//
//   Dialog — doc-backed, error: "To correctly label a dialog, always include a
//     title (`<Dialog.Title>`) or an `aria-label`."
//     (marigold-ui.io/components/overlay/dialog)
//   Drawer — warning: Drawer wraps the same React Aria dialog primitive, which
//     emits a runtime warning when a dialog has no accessible name. The Marigold
//     docs mark `Drawer.Title` as *optional*, so this is inferred rather than
//     doc-mandated — hence a warning, not an error. Remove this entry to scope
//     the check to Dialog only.
const OVERLAYS: ReadonlyArray<{
  component: string;
  titleSub: string;
  severity: IssueSeverity;
}> = [
  { component: 'Dialog', titleSub: 'Title', severity: 'error' },
  { component: 'Drawer', titleSub: 'Title', severity: 'warning' },
];

const ACCESSIBLE_NAME_ATTRS = ['aria-label', 'aria-labelledby'];

const hasAccessibleNameAttr = (attrs: ts.JsxAttributes): boolean =>
  ACCESSIBLE_NAME_ATTRS.some(name => hasAttrPresent(attrs, name));

// True if a `<component.titleSub>` element exists anywhere below `node`,
// without descending into a nested `<component>` overlay (whose title belongs
// to that inner overlay, not this one).
const hasTitleDescendant = (
  node: ts.Node,
  component: string,
  titleSub: string
): boolean => {
  let found = false;

  const walk = (current: ts.Node): void => {
    if (found) return;

    if (current !== node && ts.isJsxElement(current)) {
      const tag = current.openingElement.tagName;
      if (ts.isIdentifier(tag) && tag.text === component) return; // nested overlay
    }

    const tagName = ts.isJsxElement(current)
      ? current.openingElement.tagName
      : ts.isJsxSelfClosingElement(current)
        ? current.tagName
        : undefined;

    if (
      tagName &&
      ts.isPropertyAccessExpression(tagName) &&
      ts.isIdentifier(tagName.expression) &&
      tagName.expression.text === component &&
      tagName.name.text === titleSub
    ) {
      found = true;
      return;
    }

    ts.forEachChild(current, walk);
  };

  walk(node);
  return found;
};

export const validateAccessibleName = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);
  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];
  const overlayByName = new Map(OVERLAYS.map(o => [o.component, o]));

  const check = (node: ts.Node): void => {
    // Self-closing overlays are empty by definition — the composition checker
    // already reports the missing sub-components, so flagging them here too
    // would just duplicate that finding.
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag)) {
        const overlay = overlayByName.get(tag.text);
        if (overlay) {
          const named =
            hasAccessibleNameAttr(node.openingElement.attributes) ||
            hasSpreadAttribute(node.openingElement.attributes);
          const titled = hasTitleDescendant(
            node,
            overlay.component,
            overlay.titleSub
          );
          const opaque = hasOpaqueDynamicChild(node);

          if (!named && !titled && !opaque) {
            const { line, character } = source.getLineAndCharacterOfPosition(
              node.openingElement.getStart(source)
            );
            issues.push({
              type: 'a11y',
              severity: overlay.severity,
              source: 'accessible-name',
              component: overlay.component,
              message: `<${overlay.component}> has no accessible name. A closed overlay is invisible to runtime a11y checks, so it must be labeled in the source.`,
              suggestion: `Add a <${overlay.component}.${overlay.titleSub}> child or an aria-label prop, e.g. <${overlay.component} aria-label="…"> or <${overlay.component}.${overlay.titleSub}>…</${overlay.component}.${overlay.titleSub}>.`,
              location: {
                file: relFile,
                line: line + 1,
                column: character + 1,
              },
              details: {
                accessibleNameAttrs: ACCESSIBLE_NAME_ATTRS,
                titleSubComponent: `${overlay.component}.${overlay.titleSub}`,
              },
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
