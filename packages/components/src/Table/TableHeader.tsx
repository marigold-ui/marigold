import { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

export interface TableHeaderProps {
  children: ReactNode;
  stickyHeader?: boolean;
}

export const TableHeader = ({ stickyHeader, children }: TableHeaderProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <thead
      {...rowGroupProps}
      className={stickyHeader ? '[&_th]:sticky [&_th]:top-0' : ''}
    >
      {children}
    </thead>
  );
};
