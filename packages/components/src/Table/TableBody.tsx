import { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

export interface TableBodyProps {
  children: ReactNode;
}

export const TableBody = ({ children }: TableBodyProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return <tbody {...rowGroupProps}>{children}</tbody>;
};
