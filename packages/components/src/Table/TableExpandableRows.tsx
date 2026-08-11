import type { ReactElement } from 'react';
import { Collection } from 'react-aria-components/Collection';

// Props
// ---------------
export interface TableExpandableRowsProps<T extends object = object> {
  /**
   * The rows that expanding the surrounding `Table.Row` reveals. Renders nothing
   * when `undefined` or empty, so a leaf row needs no conditional of its own.
   */
  items?: Iterable<T>;
  /**
   * Values that invalidate the cached rows, like a hook's dependency array.
   * Rendered rows are cached per item object, so anything the render function
   * reads from outside the item — state, a lookup, a prop — has to be listed
   * here or it renders stale. Needed on every level of the table separately.
   */
  dependencies?: ReadonlyArray<unknown>;
  /**
   * Render function for a single nested row. Usually the same function that
   * renders the parent row, called recursively.
   */
  children: (item: T) => ReactElement;
}

// Component
// ---------------
/**
 * Renders the rows that expanding a `Table.Row` reveals, from a list of items.
 * Place it inside the parent `Table.Row`, after its cells.
 *
 * Always render it — the Table decides whether the rows are visible, so it must
 * not be wrapped in a check of the expansion state.
 *
 * Statically known nested rows don't need this: nest `Table.Row` directly.
 */
const TableExpandableRows = <T extends object = object>({
  items,
  dependencies,
  children,
}: TableExpandableRowsProps<T>) => {
  if (!items) return null;

  return (
    <Collection items={items} dependencies={dependencies}>
      {children}
    </Collection>
  );
};

export { TableExpandableRows };
