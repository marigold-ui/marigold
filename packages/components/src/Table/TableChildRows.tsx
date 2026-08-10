import type { ReactElement } from 'react';
import { Collection } from 'react-aria-components/Collection';

// Props
// ---------------
export interface TableChildRowsProps<T extends object = object> {
  /**
   * The child rows of the surrounding `Table.Row`. Renders nothing when
   * `undefined` or empty, so a leaf row needs no conditional of its own.
   */
  items?: Iterable<T>;
  /**
   * Values that should invalidate the row cache when the child rows change.
   */
  dependencies?: ReadonlyArray<unknown>;
  /**
   * Render function for a single child row. Usually the same function that
   * renders the parent row, called recursively.
   */
  children: (item: T) => ReactElement;
}

// Component
// ---------------
/**
 * Renders the child rows of a `Table.Row` from a list of items. Place it inside
 * the parent `Table.Row`, after its cells.
 *
 * Statically known child rows don't need this: nest `Table.Row` directly.
 */
const TableChildRows = <T extends object = object>({
  items,
  dependencies,
  children,
}: TableChildRowsProps<T>) => {
  if (!items) return null;

  return (
    <Collection items={items} dependencies={dependencies}>
      {children}
    </Collection>
  );
};

export { TableChildRows };
