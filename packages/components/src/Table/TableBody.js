import React from 'react';
import { useTableRowGroup } from '@react-aria/table';
export const TableBody = ({ children }) => {
  const { rowGroupProps } = useTableRowGroup();
  return React.createElement('tbody', { ...rowGroupProps }, children);
};
//# sourceMappingURL=TableBody.js.map
