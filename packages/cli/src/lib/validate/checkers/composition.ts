import ts from 'typescript';
import path from 'node:path';
import { hasOpaqueDynamicChild, hasSpreadAttribute } from '../helpers/ast.js';
import {
  buildMarigoldTagResolver,
  getSubComponents,
  isCollectionComponent,
  isCompoundComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

const collectSubComponentUsages = (
  node: ts.Node,
  parentName: string,
  compoundParents: Set<string>,
  counts: Map<string, number>,
  isCollectionParent: boolean
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
    // Stop descending into any nested compound instance so its sub-components
    // aren't misattributed to the outer one being checked — including a
    // same-name nested instance (e.g. a confirm <Dialog> inside another
    // <Dialog>'s content), which used to be exempted and double-counted.
    // Collection compounds are the exception: they are designed to hold
    // legitimately nested same-name instances (e.g. a master-detail <Table>
    // nested inside a <Table> row), so descent continues there.
    if (
      ts.isIdentifier(tag) &&
      compoundParents.has(tag.text) &&
      (tag.text !== parentName || !isCollectionParent)
    ) {
      return;
    }
  }

  ts.forEachChild(node, child =>
    collectSubComponentUsages(
      child,
      parentName,
      compoundParents,
      counts,
      isCollectionParent
    )
  );
};

// A compound that renders a variable number of entries by design (a table has
// many rows, a select many options) repeats its sub-components as correct
// usage — duplicate warnings would be false positives. Whether a compound is
// such a collection is DERIVED from the type contract: React Aria collection
// components declare an `items` prop on the component or one of its
// sub-components (Select, Menu, Table.Body, Tabs.List, …), and the schema
// records that as `collection` (see helpers/components.ts).
//
// Four static collections expose no `items` API — their entries are always
// written by hand — yet repeat their Item sub-component by design. The type
// contract cannot distinguish them from singleton-slot compounds (Sidebar.Item
// and Dialog.Title have the same shape), so this remainder stays curated.
export const STATIC_COLLECTION_COMPOUNDS = new Set([
  'Accordion',
  'FileField',
  'List',
  'Sidebar',
]);

const isCollectionCompound = (componentName: string): boolean =>
  isCollectionComponent(componentName) ||
  STATIC_COLLECTION_COMPOUNDS.has(componentName);

// Compounds that render their item sub-components internally from data/props
// rather than from author-written JSX. <FileField multiple /> emits a
// <FileField.Item> per selected file at runtime — the canonical usage is the
// bare self-closing element, and no story writes <FileField.Item> by hand. This
// differs from Select/Table/Tabs, where the author DOES write the items, so an
// empty one of those is still a real error. Keep this list narrow and verified.
const SELF_POPULATING_COMPOUNDS = new Set(['FileField']);

// Some compounds are designed to hold multiple instances of a sub-component
// that is NOT part of the shared React Aria collection vocabulary above, so the
// collection-item heuristic misses them. An ActionBar, for example, is a
// toolbar of N action buttons — repeating <ActionBar.Button> is correct usage,
// not a duplicate-slot mistake. Curated per parent to avoid making a generic
// name like "Button" repeatable everywhere.
const REPEATABLE_SUBS: Record<string, Set<string>> = {
  ActionBar: new Set(['Button']),
};

// `X.Group` / `X.Trigger` (Checkbox.Group, Radio.Group, Tooltip.Trigger,
// Dialog.Trigger, …) are INVERSE compounds: the Group/Trigger is a PARENT
// wrapper that takes <X> as its child/content, not a child slot OF <X>. The
// schema registers them as sub-components because Marigold attaches them
// statically (`Checkbox.Group = CheckboxGroup`), but a bare <X> is valid usage —
// the common case is <CheckboxGroup><Checkbox/></...> or
// <TooltipTrigger>…<Tooltip>text</Tooltip></TooltipTrigger>. Treating them as
// required children produces a false "used without sub-components" error.
// Derived from the shared React Aria wrapper naming, not a per-component list.
// (Removing them only suppresses the empty-compound error for components whose
// ONLY sub-components are wrappers, e.g. Checkbox/Radio/Tooltip; Dialog keeps
// Content/Title and is still checked.)
const WRAPPER_SUBCOMPONENTS = new Set(['Group', 'Trigger']);

// Compounds whose sub-components are OPTIONAL structure rather than the content
// itself: the component renders its primary content from a plain `children`
// prop, and sub-components like SectionMessage.Title / .Content only add
// optional layout. A bare <SectionMessage>text</SectionMessage> is canonical
// usage, so the empty-compound error is a false positive. This cannot be
// derived from the schema — Dialog/Select also declare a `children` prop, yet
// there the sub-components ARE the content — so the list is curated and
// verified against the component docs.
const OPTIONAL_SUBCOMPONENT_COMPOUNDS = new Set(['SectionMessage']);

const collectAncestorSubComponents = (
  node: ts.Node,
  parentName: string,
  counts: Map<string, number>
): void => {
  let current = node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      const tag = current.openingElement.tagName;
      // Stop at the nearest enclosing <parentName> instance: anything above
      // it belongs to a different (outer) instance of the same compound, not
      // the one being checked (e.g. a nested <Dialog> inside another
      // <Dialog>'s content must not inherit the outer instance's ancestors).
      if (ts.isIdentifier(tag) && tag.text === parentName) {
        break;
      }
      // Only wrapper sub-components (Group/Trigger) are legitimately found as
      // an ancestor of the instance they wrap (e.g. <Dialog.Trigger><Dialog>
      // ...</Dialog></Dialog.Trigger>). A forward child-slot
      // (Content/Title/Actions) is never really an ancestor of its own
      // compound instance — if one shows up here it's the *outer* dialog's
      // slot wrapping a nested same-name Dialog, and attributing it to the
      // inner instance would be a false duplicate.
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression) &&
        tag.expression.text === parentName &&
        WRAPPER_SUBCOMPONENTS.has(tag.name.text)
      ) {
        const sub = tag.name.text;
        counts.set(sub, (counts.get(sub) ?? 0) + 1);
      }
    }
    current = current.parent;
  }
};

// A spread attribute (`<X {...props} />`) may carry the sub-components / a
// forwarded children prop, which cannot be resolved statically — so a compound
// with a spread is left alone to avoid a false empty-compound error.
const hasSpread = (node: ts.JsxElement | ts.JsxSelfClosingElement): boolean =>
  hasSpreadAttribute(
    ts.isJsxSelfClosingElement(node)
      ? node.attributes
      : node.openingElement.attributes
  );

export const validateComposition = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);

  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  // Only treat a tag as a Marigold compound when it is actually imported from
  // @marigold/components. A locally declared or third-party component that
  // happens to share a Marigold name (e.g. a project's own `Sidebar`) must not
  // be required to carry Marigold sub-components — that was a false-positive
  // error. Mirrors the origin guard the prop checker uses.
  const resolver = buildMarigoldTagResolver(source);
  // Resolve through the resolver so an aliased import (`{ Accordion as Acc }`)
  // is checked against its real Marigold name, not the local alias (which the
  // registry does not know). resolver.get returns the original name for both
  // aliased and plain @marigold/components imports, undefined otherwise.
  const isMarigoldCompound = (name: string): boolean => {
    const original = resolver.get(name);
    return original !== undefined && isCompoundComponent(original);
  };

  const compoundParents = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && isMarigoldCompound(tag.text)) {
        compoundParents.add(tag.text);
      }
    } else if (ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (ts.isIdentifier(tag) && isMarigoldCompound(tag.text)) {
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

      if (info && isMarigoldCompound(info.tag.text)) {
        const componentName = info.tag.text;
        // `original` (real Marigold name) drives registry/curated lookups;
        // `componentName` (as written, possibly an alias) drives JSX
        // sub-component matching and the reported message. They are identical
        // for a non-aliased import.
        const original = resolver.get(componentName) ?? componentName;
        const knownSubs = getSubComponents(original);
        if (!knownSubs || knownSubs.length === 0) {
          ts.forEachChild(node, check);
          return;
        }

        // Strip grouping wrappers (X.Group): they are inverse compounds, so a
        // component whose only sub-components are wrappers is not child-bearing
        // and a bare <X> must not be flagged as empty.
        const childSlotSubs = knownSubs.filter(
          s => !WRAPPER_SUBCOMPONENTS.has(s)
        );
        if (childSlotSubs.length === 0) {
          ts.forEachChild(node, check);
          return;
        }

        const isSelfClosing = ts.isJsxSelfClosingElement(node);
        const isDynamic =
          !isSelfClosing && hasOpaqueDynamicChild(node as ts.JsxElement);
        const spread = hasSpread(
          node as ts.JsxElement | ts.JsxSelfClosingElement
        );
        const collectionLike = isCollectionCompound(original);

        const counts = new Map<string, number>();
        collectAncestorSubComponents(node, componentName, counts);
        if (!isSelfClosing) {
          for (const child of (node as ts.JsxElement).children) {
            if (isDynamic && ts.isJsxExpression(child)) continue;
            collectSubComponentUsages(
              child,
              componentName,
              compoundParents,
              counts,
              collectionLike
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

        // Only a completely empty compound is an unambiguous error. Partial
        // "missing sub-component" findings are too often optional to flag
        // reliably (e.g. a Dialog opened programmatically needs no Trigger).
        // Self-populating compounds are exempt: they render their item children
        // from data/props at runtime, not from author-written JSX, so an empty
        // usage is correct rather than a missing-children error.
        if (
          found.length === 0 &&
          !isDynamic &&
          !spread &&
          !SELF_POPULATING_COMPOUNDS.has(original) &&
          !OPTIONAL_SUBCOMPONENT_COMPOUNDS.has(original)
        ) {
          issues.push({
            type: 'technical',
            severity: 'error',
            source: 'composition-validator',
            component: componentName,
            message: `<${componentName}> is used without any of its sub-components.`,
            suggestion: `Use compound children: ${childSlotSubs.map(s => `<${componentName}.${s}>`).join(', ')}.`,
            location,
            details: { expected: childSlotSubs, found: [] },
          });
        }

        // Duplicate-instance warnings only make sense for singleton slots
        // (e.g. two <Dialog.Title>). Collection compounds repeat sub-components
        // by design, so suppress the warning there to avoid false positives.
        if (!collectionLike) {
          const repeatable = REPEATABLE_SUBS[original];
          const duplicates = [...counts.entries()].filter(
            ([sub, n]) => n > 1 && !repeatable?.has(sub)
          );
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
