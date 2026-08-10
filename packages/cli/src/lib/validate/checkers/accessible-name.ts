import ts from 'typescript';
import path from 'node:path';
import {
  getJsxTagRootIdentifier,
  hasAttrPresent,
  hasOpaqueDynamicChild,
  hasSpreadAttribute,
  isPascalCase,
} from '../helpers/ast.js';
import { buildMarigoldTagResolver } from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { IssueSeverity, ValidationIssue } from '../types.js';

// Overlays whose content is absent from the DOM until they open, so axe-core
// never sees their role or title at runtime. This static check fills that gap:
// each must carry an accessible name via `aria-label`/`aria-labelledby` or an
// `<X.Title>` child.
//
//   Dialog — doc-backed, error: "To correctly label a dialog, always include a
//     title (`<Dialog.Title>`) or an `aria-label`."
//     (marigold-ui.io/components/overlay/dialog)
//   Drawer — warning: it wraps the same React Aria primitive, which warns at
//     runtime without a name, but the docs mark `Drawer.Title` optional, so
//     this is inferred rather than doc-mandated.
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

// A user-authored child (a project's own `<DialogHeader>`) may render the
// title where this static check cannot see. Treated as indeterminate, like an
// opaque `{expression}` child. Only relaxed for components the resolver can't
// identify — a known Marigold component would never render another overlay's
// title, so it must not suppress a genuine finding.
const hasUnresolvedComponentChild = (
  node: ts.JsxElement,
  component: string,
  resolver: Map<string, string>
): boolean => {
  let found = false;

  const walk = (current: ts.Node): void => {
    if (found) return;

    if (current !== node) {
      const tag = ts.isJsxElement(current)
        ? current.openingElement.tagName
        : ts.isJsxSelfClosingElement(current)
          ? current.tagName
          : undefined;
      if (tag) {
        if (ts.isIdentifier(tag) && tag.text === component) return; // nested overlay
        const root = getJsxTagRootIdentifier(tag);
        if (
          root &&
          isPascalCase(root.text) &&
          resolver.get(root.text) === undefined
        ) {
          found = true;
          return;
        }
      }
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
  // Only tags actually imported from @marigold/components: a project's own
  // `Dialog` must not be required to carry an accessible name. Mirrors the
  // composition checker's origin guard.
  const resolver = buildMarigoldTagResolver(source);

  const check = (node: ts.Node): void => {
    // Self-closing overlays are empty by definition; the composition checker
    // already reports the missing sub-components.
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag)) {
        const original = resolver.get(tag.text);
        const overlay = original ? overlayByName.get(original) : undefined;
        if (overlay) {
          const named =
            hasAccessibleNameAttr(node.openingElement.attributes) ||
            hasSpreadAttribute(node.openingElement.attributes);
          // Matched against `tag.text` (as written), not `overlay.component`,
          // so an aliased import (`{ Dialog as D }`) still finds `<D.Title>`.
          const titled = hasTitleDescendant(node, tag.text, overlay.titleSub);
          const opaque =
            hasOpaqueDynamicChild(node) ||
            hasUnresolvedComponentChild(node, tag.text, resolver);

          if (!named && !titled && !opaque) {
            const { line, character } = source.getLineAndCharacterOfPosition(
              node.openingElement.getStart(source)
            );
            issues.push({
              type: 'a11y',
              severity: overlay.severity,
              source: 'accessible-name',
              component: tag.text,
              message: `<${tag.text}> has no accessible name. A closed overlay is invisible to runtime a11y checks, so it must be labeled in the source.`,
              suggestion: `Add a <${tag.text}.${overlay.titleSub}> child or an aria-label prop, e.g. <${tag.text} aria-label="…"> or <${tag.text}.${overlay.titleSub}>…</${tag.text}.${overlay.titleSub}>.`,
              location: {
                file: relFile,
                line: line + 1,
                column: character + 1,
              },
              details: {
                accessibleNameAttrs: ACCESSIBLE_NAME_ATTRS,
                titleSubComponent: `${tag.text}.${overlay.titleSub}`,
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
