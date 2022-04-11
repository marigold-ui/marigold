import React, { RefObject, useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';
import { TableState } from '@react-stately/table';
import { Node } from '@react-types/shared';

// Props
// ----------------------------
export interface TableHeaderRowProps {
  item: Node<object>;
  state: TableState<object>;
}

// TableHeaderRow Component
// ----------------------------
export const TableHeaderRow: React.FC<TableHeaderRowProps> = ({
  item,
  state,
  children,
}) => {
  const ref = useRef<HTMLElement>();
  const { rowProps } = useTableHeaderRow(
    { node: item },
    state,
    ref as RefObject<HTMLElement>
  );

  return (
    <tr {...rowProps} ref={ref as RefObject<HTMLTableRowElement>}>
      {children}
    </tr>
  );
};
