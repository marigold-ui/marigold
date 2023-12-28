import { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

export interface TableHeaderProps {
  children: ReactNode;
  sticky?: boolean;
}

export const TableHeader = ({ sticky, children }: TableHeaderProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <thead
      {...rowGroupProps}
      className={sticky ? '[&_th]:sticky [&_th]:top-0' : ''}
    >
      {children}
    </thead>
  );
};
