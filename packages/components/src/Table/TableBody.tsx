import { ReactNode } from 'react';
import { useTableRowGroup } from '@react-aria/table';
import { TableBodyProps as BodyProps } from '@react-stately/table';
import { useTableContext } from './Context';

export interface TableBodyProps
  extends Omit<BodyProps<object>, 'children' | 'loadingState' | 'items'> {
  /**
   * The children of the component.
   */
  children?: ReactNode;

  /**
   * The CSS classes to apply to the component.
   */
  className?: string;

  /**
   * Provides content to display when there are no rows in the table.
   */
  emptyState?: () => ReactNode;
}

export const TableBody = ({
  children = undefined,
  className,
  emptyState,
}: TableBodyProps) => {
  const { rowGroupProps } = useTableRowGroup();
  const { state, classNames } = useTableContext();

  if (state.collection.size === 0 && emptyState) {
    return (
      <tbody className={className} data-rac>
        <tr className={classNames?.row} role="row" data-rac>
          <td
            className={classNames?.cell}
            colSpan={state.collection.columnCount}
            role="rowheader"
            data-rac
          >
            {emptyState()}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody {...rowGroupProps} className={className} data-rac>
      {children}
    </tbody>
  );
};
