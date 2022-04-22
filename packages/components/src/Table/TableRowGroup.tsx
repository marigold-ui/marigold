import React, { ReactNode } from 'react';
import { useTableRowGroup } from '@react-aria/table';

// Props
// ----------------------------
export interface TableRowGroupProps {
  children?: ReactNode;
  as: 'thead' | 'tbody' | 'tfoot';
}

// TableRowGroup Component
// ----------------------------
export const TableRowGroup = ({
  as: Element,
  children,
}: TableRowGroupProps) => {
  const { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
};
