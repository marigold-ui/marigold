import ts from 'typescript';
import path from 'node:path';
import {
  getSubComponents,
  isCompoundComponent,
} from '../helpers/components.js';
import { parseSource } from '../helpers/source.js';
import type { ValidationIssue } from '../types.js';

const collectSubComponentUsages = (
  node: ts.Node,
  parentName: string,
  compoundParents: Set<string>,
  counts: Map<string, number>
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
    if (
      ts.isIdentifier(tag) &&
      compoundParents.has(tag.text) &&
      tag.text !== parentName
    ) {
      return;
    }
  }

  ts.forEachChild(node, child =>
    collectSubComponentUsages(child, parentName, compoundParents, counts)
  );
};

// A compound that exposes a collection-item sub-component renders a variable
// number of those children by design (a table has many columns, a select many
// options). For such components, repetition is correct usage — duplicate
// warnings would be false positives. This is derived from the schema's own
// sub-component names rather than a per-component hardcoded list: the item
// vocabulary (Item, Option, Row, Column, Cell, Tab, TabPanel) is shared across
// React Aria collections.
const COLLECTION_ITEM_INDICATORS = new Set([
  'Item',
  'Option',
  'Row',
  'Column',
  'Cell',
  'Tab',
  'TabPanel',
]);

const isCollectionCompound = (knownSubs: string[]): boolean =>
  knownSubs.some(s => COLLECTION_ITEM_INDICATORS.has(s));

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
      if (
        ts.isPropertyAccessExpression(tag) &&
        ts.isIdentifier(tag.expression) &&
        tag.expression.text === parentName
      ) {
        const sub = tag.name.text;
        counts.set(sub, (counts.get(sub) ?? 0) + 1);
      }
    }
    current = current.parent;
  }
};

// A child whose content is an opaque expression — `{children}`,
// `{renderContent()}`, `{items.map(...)}`, `{cond ? <X/> : <Y/>}` — could carry
// the sub-components at runtime, so the absence of a static `<X.Sub>` is not
// provable and the parent compound must not be reported empty. Inline render
// functions (`{() => <X.Title/>}`) are intentionally NOT opaque: their body is
// part of the AST and is walked by collectSubComponentUsages.
//
// This mirrors hasOpaqueDynamicChild in accessible-name.ts (the source of
// truth). It is a strict SUPERSET of the previous bare-identifier/iteration
// detection for JsxExpression children, so it only REMOVES false "used without
// sub-components" errors; non-expression children (e.g. <Dialog><p/></Dialog>)
// are still not dynamic, so the genuine empty-compound error is preserved.
const hasOpaqueDynamicChild = (element: ts.JsxElement): boolean =>
  element.children.some(
    child =>
      ts.isJsxExpression(child) &&
      child.expression !== undefined &&
      !ts.isArrowFunction(child.expression) &&
      !ts.isFunctionExpression(child.expression)
  );

// A spread attribute (`<X {...props} />`) may carry the sub-components / a
// forwarded children prop, which cannot be resolved statically — so a compound
// with a spread is left alone to avoid a false empty-compound error. Mirrors
// the spread guards in accessible-name.ts / section-header.ts.
const hasSpread = (node: ts.JsxElement | ts.JsxSelfClosingElement): boolean => {
  const attrs = ts.isJsxSelfClosingElement(node)
    ? node.attributes
    : node.openingElement.attributes;
  return attrs.properties.some(ts.isJsxSpreadAttribute);
};

export const validateComposition = (filePath: string): ValidationIssue[] => {
  const source = parseSource(filePath);

  const relFile = path.relative(process.cwd(), filePath);
  const issues: ValidationIssue[] = [];

  const compoundParents = new Set<string>();
  const visit = (node: ts.Node): void => {
    if (ts.isJsxElement(node)) {
      const tag = node.openingElement.tagName;
      if (ts.isIdentifier(tag) && isCompoundComponent(tag.text)) {
        compoundParents.add(tag.text);
      }
    } else if (ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName;
      if (ts.isIdentifier(tag) && isCompoundComponent(tag.text)) {
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

      if (info && isCompoundComponent(info.tag.text)) {
        const componentName = info.tag.text;
        const knownSubs = getSubComponents(componentName);
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

        const counts = new Map<string, number>();
        collectAncestorSubComponents(node, componentName, counts);
        if (!isSelfClosing) {
          for (const child of (node as ts.JsxElement).children) {
            if (isDynamic && ts.isJsxExpression(child)) continue;
            collectSubComponentUsages(
              child,
              componentName,
              compoundParents,
              counts
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
        const collectionLike = isCollectionCompound(knownSubs);

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
          !SELF_POPULATING_COMPOUNDS.has(componentName) &&
          !OPTIONAL_SUBCOMPONENT_COMPOUNDS.has(componentName)
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
          const repeatable = REPEATABLE_SUBS[componentName];
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
