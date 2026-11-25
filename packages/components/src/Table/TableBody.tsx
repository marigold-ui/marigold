import type { ReactNode } from 'react';
import { Children, use } from 'react';
import type RAC from 'react-aria-components';
import {
  TableBody as RACTableBody,
  TableStateContext,
} from 'react-aria-components/Table';
import { cn } from '@marigold/system';
import { Skeleton } from '../Skeleton/Skeleton';
import type { SkeletonColumn } from './Context';
import { skeletonRowKey, useTableContext } from './Context';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';

type RemovedProps = 'className' | 'style' | 'renderEmptyState';

export interface TableBodyProps<T extends object = object> extends Omit<
  RAC.TableBodyProps<T>,
  RemovedProps
> {
  /**
   * Render function called when the table body has no items to display.
   */
  emptyState?: RAC.TableBodyProps<T>['renderEmptyState'];
  /**
   * Number of skeleton rows to show while the table is `loading` and the body
   * has no rows yet, for the first load. Each row holds a skeleton per column,
   * which a column can shape with its `skeleton` prop, and none of them can be
   * selected. Without it, a loading table with no rows shows its `emptyState`.
   */
  skeletonRows?: number;
}

export const isEmptyBody = <T extends object>({
  items,
  children,
}: Pick<TableBodyProps<T>, 'items' | 'children'>) => {
  if (items) return [...items].length === 0;
  // A render function without `items` has nothing to render.
  if (typeof children === 'function') return true;
  // Unlike `Children.count`, drops `false` and `null` from `{loaded && rows}`.
  return Children.toArray(children).length === 0;
};

// Columns read from the collection carry no element: one in state would
// rebuild the collection on every render. Look it up while the cell renders.
const ColumnSkeleton = ({ column }: { column: SkeletonColumn }) => {
  const state = use(TableStateContext);
  const fromCollection: ReactNode = state?.collection.getItem(column.key)?.props
    .skeleton;
  return column.skeleton ?? fromCollection ?? <Skeleton />;
};

const TableBody = <T extends object = object>({
  emptyState,
  skeletonRows,
  ...props
}: TableBodyProps<T>) => {
  const { classNames, loading, skeletonColumns } = useTableContext();

  if (loading && skeletonRows && isEmptyBody(props)) {
    const { items: _items, children: _children, ...bodyProps } = props;
    return (
      // No `emptyState`: the body isn't empty, it is still loading.
      <RACTableBody {...bodyProps} className={cn(classNames.body)}>
        {/* Without static header columns, they're known after the first pass. */}
        {skeletonColumns.length > 0 &&
          Array.from({ length: skeletonRows }, (_, index) => (
            <TableRow key={index} id={skeletonRowKey(index)} isDisabled>
              {skeletonColumns.map(column => (
                <TableCell
                  key={String(column.key)}
                  // A row header needs text for type-to-select, and there is none yet.
                  textValue=""
                  alignX={column.alignX}
                >
                  <ColumnSkeleton column={column} />
                </TableCell>
              ))}
            </TableRow>
          ))}
      </RACTableBody>
    );
  }

  return (
    <RACTableBody
      {...props}
      className={cn(classNames.body)}
      renderEmptyState={emptyState}
    />
  );
};

export { TableBody };
