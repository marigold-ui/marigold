import { Children, use } from 'react';
import type RAC from 'react-aria-components';
import { TableBody as RACTableBody } from 'react-aria-components/Table';
import { cn } from '@marigold/system';
import { Skeleton } from '../Skeleton/Skeleton';
import {
  TableSkeletonLinesContext,
  skeletonRowKey,
  useTableContext,
  useTableSkeletonContext,
} from './Context';
import { TableCell } from './TableCell';
import { TableRow, lineBox } from './TableRow';

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
   * has no rows yet, for the first load. Each row holds a skeleton per column
   * and none of them can be selected. Before the first load a cell holds one
   * line, after that as many lines as its column's real cells had, and a row
   * is as tall as the real rows were on average.
   * Without it, a loading table with no rows shows its `emptyState`.
   */
  skeletonRows?: number;
}

export const isEmptyBody = <T extends object>({
  items,
  children,
}: Pick<TableBodyProps<T>, 'items' | 'children'>) => {
  // Checks for a first item instead of copying every row.
  if (items) return !!items[Symbol.iterator]().next().done;
  // A render function without `items` has nothing to render.
  if (typeof children === 'function') return true;
  // Unlike `Children.count`, drops `false` and `null` from `{loaded && rows}`.
  return Children.toArray(children).length === 0;
};

// One line box per bar, so stacked bars are spaced like the text. The last of
// several ends shorter, like a paragraph.
const SkeletonLines = ({ columnKey }: { columnKey: RAC.Key }) => {
  const count = use(TableSkeletonLinesContext).get(columnKey) ?? 1;
  return Array.from({ length: count }, (_, line) => (
    <div key={line} className={lineBox}>
      <Skeleton width={line > 0 && line === count - 1 ? '2/3' : 'full'} />
    </div>
  ));
};

const TableBody = <T extends object = object>({
  emptyState,
  skeletonRows,
  ...props
}: TableBodyProps<T>) => {
  const { classNames } = useTableContext();
  const { loading, skeletonColumns } = useTableSkeletonContext();

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
                  <SkeletonLines columnKey={column.key} />
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
