import React, { ReactNode } from 'react';

import { useTableRowGroup } from '@react-aria/table';

export interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return <thead {...rowGroupProps}>{children}</thead>;
};
