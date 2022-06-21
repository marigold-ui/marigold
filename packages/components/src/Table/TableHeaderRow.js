import React, { useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';
import { useTableContext } from './Context';
// Component
// ---------------
export const TableHeaderRow = ({ item, children }) => {
  const { state } = useTableContext();
  const ref = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);
  return React.createElement('tr', { ...rowProps, ref: ref }, children);
};
//# sourceMappingURL=TableHeaderRow.js.map
