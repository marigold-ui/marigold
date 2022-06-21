import React from 'react';
import { useTableRowGroup } from '@react-aria/table';
export const TableHeader = ({ children }) => {
  const { rowGroupProps } = useTableRowGroup();
  return React.createElement('thead', { ...rowGroupProps }, children);
};
//# sourceMappingURL=TableHeader.js.map
