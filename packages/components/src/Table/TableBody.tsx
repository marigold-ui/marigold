import { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

import { TableBodyProps as BodyProps } from '@react-stately/table';

export interface TableBodyProps extends Omit<BodyProps<object>, 'children'> {
  /**
   * The chilren of the component.
   */
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return <tbody {...rowGroupProps}>{children}</tbody>;
};
