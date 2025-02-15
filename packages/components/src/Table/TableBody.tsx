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
  children,
  className,
  emptyState,
}: TableBodyProps) => {
  const { rowGroupProps } = useTableRowGroup();
  const { state, classNames } = useTableContext();

  if (state.collection.size === 0 && emptyState) {
    return (
      <tbody className={className}>
        <tr className={classNames?.row} role="row">
          <td
            className={classNames?.cell}
            colSpan={state.collection.size}
            role="rowheader"
          >
            {emptyState()}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody {...rowGroupProps} className={className}>
      {children}
    </tbody>
  );
};
