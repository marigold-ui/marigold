import React, { ReactNode, useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';
import { TableState } from '@react-stately/table';
import { Node } from '@react-types/shared';

// Props
// ----------------------------
export interface TableHeaderRowProps {
  item: Node<object>;
  state: TableState<object>;
  children?: ReactNode;
}

// TableHeaderRow Component
// ----------------------------
export const TableHeaderRow = ({
  item,
  state,
  children,
}: TableHeaderRowProps) => {
  const ref = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
};
