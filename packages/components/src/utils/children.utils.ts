import type { ElementType, ReactNode } from 'react';
import { Children, isValidElement } from 'react';

/**
 * One child of a collection: a row, or the render function of the dynamic
 * `items` form. A collection's own `children` takes either, but not both, and
 * a header part has to sit beside whichever one the author chose — hence the
 * array form in `CollectionChildren`.
 */
export type CollectionChild<T> = ReactNode | ((item: T) => ReactNode);
export type CollectionChildren<T> = CollectionChild<T> | CollectionChild<T>[];

// Arrays only, never Fragments: nesting is how `{rows.map(…)}` and a grouped
// header arrive, and flattening it is what lets the header be found wherever
// the author happened to put it. A Fragment stays one child, which is what the
// collection makes of it anyway.
const flattenChildren = <T>(
  children: CollectionChildren<T>
): CollectionChild<T>[] =>
  Array.isArray(children)
    ? children.flatMap(child => flattenChildren(child as CollectionChildren<T>))
    : [children];

/**
 * Pulls a collection's header part out of its children, so the collection
 * itself only ever sees items. Returns `[header, items]`.
 *
 * A RAC collection builds its items from its children, so a header cannot be
 * one of them — this is the "collection semantics" exception to placing parts
 * with CSS (see ADR-0005). The items are handed back as they came in, which
 * keeps a render function (the dynamic `items` form) a function.
 */
export const splitCollectionHeader = <T>(
  children: CollectionChildren<T>,
  Header: ElementType
): [ReactNode, CollectionChild<T>] => {
  const childArray = flattenChildren(children);
  const headerIndex = childArray.findIndex(
    child => isValidElement(child) && child.type === Header
  );

  // Casts, not lies: a collection's own `children` type is "nodes *or* one
  // render function", so the array an author writes to put a header beside a
  // render function has no type a collection accepts. Splitting the header out
  // is what makes the rest expressible again — a lone render function, or a
  // list of rows.
  if (headerIndex === -1) {
    return [null, children as CollectionChild<T>];
  }

  const items = childArray.filter((_, index) => index !== headerIndex);

  return [
    childArray[headerIndex] as ReactNode,
    (items.length === 1 ? items[0] : items) as CollectionChild<T>,
  ];
};

export const splitChildren = (children: ReactNode, at?: number) => {
  const childArray = Children.toArray(children);

  if (at === undefined) {
    return [childArray, []];
  }

  return [childArray.slice(0, at), childArray.slice(at)];
};
