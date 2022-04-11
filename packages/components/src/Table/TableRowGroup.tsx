import React from 'react';
import { useTableRowGroup } from '@react-aria/table';

// Props
// ----------------------------
export interface TableRowGroupProps {
  type: 'thead' | 'tbody' | 'tfoot';
}

// TableRowGroup Component
// ----------------------------
export const TableRowGroup: React.FC<TableRowGroupProps> = ({
  type: Element,
  children,
}) => {
  const { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
};
