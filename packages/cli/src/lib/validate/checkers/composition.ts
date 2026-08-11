import ts from 'typescript';
import path from 'node:path';
import {
  getJsxTagRootIdentifier,
  hasOpaqueDynamicChild,
  hasSpreadAttribute,
  isPascalCase,
} from '../helpers/ast.js';
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
    // Stop descending into a nested compound so its sub-components aren't
    // misattributed to the outer one — including a same-name nesting (a confirm
    // <Dialog> inside another <Dialog>). Collection compounds are the
    // exception: nested same-name instances are their design (a <Table> in a
    // <Table> row), so descent continues there.
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

// A compound that renders a variable number of entries by design repeats its
// sub-components as correct usage, so duplicate warnings would be false
// positives. That is derived from the type contract: collection components
// declare an `items` prop, which the schema records as `collection`.
//
// These four expose no `items` API — their entries are always hand-written —
// yet repeat their Item sub-component by design. The type contract cannot tell
// them from singleton-slot compounds (Sidebar.Item and Dialog.Title have the
// same shape), so this remainder stays curated.
export const STATIC_COLLECTION_COMPOUNDS = new Set([
  'Accordion',
  'FileField',
  'List',
  'Sidebar',
]);

const isCollectionCompound = (componentName: string): boolean =>
  isCollectionComponent(componentName) ||
  STATIC_COLLECTION_COMPOUNDS.has(componentName);

// Compounds that render their items internally from data rather than from
// author-written JSX: <FileField multiple /> emits a <FileField.Item> per file
// at runtime, so the bare element is canonical. Unlike Select/Table/Tabs, where
// the author writes the items and an empty one is a real error.
const SELF_POPULATING_COMPOUNDS = new Set(['FileField']);

// Compounds holding multiple instances of a sub-component outside the React
// Aria collection vocabulary, which the heuristic above misses. An ActionBar is
// a toolbar of N buttons, so repeating <ActionBar.Button> is correct. Curated
// per parent so a generic name like "Button" isn't repeatable everywhere.
const REPEATABLE_SUBS: Record<string, Set<string>> = {
  ActionBar: new Set(['Button']),
};

// `X.Group` / `X.Trigger` are INVERSE compounds: the wrapper takes <X> as its
// child, rather than being a slot OF <X>. The schema lists them as
// sub-components because Marigold attaches them statically
// (`Checkbox.Group = CheckboxGroup`), but a bare <X> is valid usage, so
// treating them as required children yields a false empty-compound error.
// Derived from the React Aria wrapper naming, not a per-component list.
const WRAPPER_SUBCOMPONENTS = new Set(['Group', 'Trigger']);

// Compounds whose sub-components are optional structure rather than the content
// itself: the content comes from a plain `children` prop and .Title/.Content
// only add layout, so a bare <SectionMessage>text</SectionMessage> is
// canonical. Not derivable from the schema — Dialog/Select also declare
// `children`, but there the sub-components ARE the content.
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
      // Stop at the nearest enclosing <parentName>: anything above it belongs
      // to an outer instance of the same compound, not the one being checked.
      if (ts.isIdentifier(tag) && tag.text === parentName) {
        break;
      }
      // Only wrappers (Group/Trigger) are legitimately an ancestor of the
      // instance they wrap. A forward child-slot showing up here is the outer
      // instance's slot around a nested same-name one, so attributing it to
      // the inner instance would be a false duplicate.
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

// A spread may carry the sub-components or a forwarded children prop, which
// can't be resolved statically — so a compound with one is left alone.
const hasSpread = (node: ts.JsxElement | ts.JsxSelfClosingElement): boolean =>
  hasSpreadAttribute(
    ts.isJsxSelfClosingElement(node)
      ? node.attributes
      : node.openingElement.attributes
  );

// A user-authored child (a project's own `<DialogBody>`) may render the
// sub-components internally where this static check cannot see. Treated as
// indeterminate, like an opaque `{expression}` child. Only relaxed for
// components the resolver can't identify — a known Marigold component would
// never render another compound's slots. Mirrors accessible-name.ts.
const hasUnresolvedComponentChild = (
  node: ts.JsxElement,
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
      const root = tag && getJsxTagRootIdentifier(tag);
      if (
        root &&
        isPascalCase(root.text) &&
        resolver.get(root.text) === undefined
      ) {
        found = true;
        return;
      }
    }

    ts.forEachChild(current, walk);
  };

  walk(node);
  return found;
};

export const validateComposition = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);

  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  // Only treat a tag as a Marigold compound when it is actually imported from
  // @marigold/components. A locally declared or third-party component that
  // happens to share a Marigold name (e.g. a project's own `Sidebar`) must not
  // be required to carry Marigold sub-components. Mirrors the origin guard
  // the prop checker uses.
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
        // `original` drives registry lookups; `componentName` (as written,
        // possibly aliased) drives JSX matching and the message.
        const original = resolver.get(componentName) ?? componentName;
        const knownSubs = getSubComponents(original);
        if (!knownSubs || knownSubs.length === 0) {
          ts.forEachChild(node, check);
          return;
        }

        // Strip grouping wrappers: a component whose only sub-components are
        // inverse wrappers isn't child-bearing, so a bare <X> isn't empty.
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
        const hasUnresolvedChild =
          !isSelfClosing &&
          hasUnresolvedComponentChild(node as ts.JsxElement, resolver);
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

        // Only a completely empty compound is unambiguous. Partial "missing
        // sub-component" findings are too often optional (a Dialog opened
        // programmatically needs no Trigger). Self-populating compounds are
        // exempt — they render their items from data, so empty is correct.
        if (
          found.length === 0 &&
          !isDynamic &&
          !spread &&
          !hasUnresolvedChild &&
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

        // Duplicate warnings only make sense for singleton slots (two
        // <Dialog.Title>); collection compounds repeat theirs by design.
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
