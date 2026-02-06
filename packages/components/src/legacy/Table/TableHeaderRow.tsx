import { ReactNode, useRef } from 'react';
import { useTableHeaderRow } from '@react-aria/table';
import { GridNode } from '@react-types/grid';
import { useTableContext } from './Context';

// Props
// ---------------
export interface TableHeaderRowProps {
  children: ReactNode;
  item: GridNode<object>;
  className?: string;
}

// Component
// ---------------
export const TableHeaderRow = ({
  item,
  className,
  children,
}: TableHeaderRowProps) => {
  const { state } = useTableContext();

  const ref = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} className={className} ref={ref} data-rac>
      {children}
    </tr>
  );
};
