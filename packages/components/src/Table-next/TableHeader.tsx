import React, { ReactNode } from 'react';
import { useTableRowGroup } from '@react-aria/table';
import { Box } from '@marigold/system';

export interface TableHeaderProps {
  children?: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return <Box {...rowGroupProps}>{children}</Box>;
};
