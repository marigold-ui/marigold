import { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

import { TableBodyProps as BodyProps } from '@react-stately/table';

import { useTableContext } from './Context';

export interface TableBodyProps extends Omit<BodyProps<object>, 'children'> {
  /**
   * The chilren of the component.
   */
  children: ReactNode;

  emptyState?: () => ReactNode;
}

export const TableBody = ({ children, emptyState }: TableBodyProps) => {
  const { rowGroupProps } = useTableRowGroup();
  const { state, classNames } = useTableContext();

  if (state.collection.size === 0 && emptyState) {
    return (
      <tr className={classNames?.row} role="row">
        <td
          className={classNames?.cell}
          colSpan={state.collection.size}
          role="rowheader"
        >
          {emptyState()}
        </td>
      </tr>
    );
  }

  return <tbody {...rowGroupProps}>{children}</tbody>;
};
