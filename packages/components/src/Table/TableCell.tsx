import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell, useTableOptions } from 'react-aria-components';
import { cn, textAlign } from '@marigold/system';
import { useTableContext } from './Context';
import { TableSelectableCell } from './TableSelectableCell';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';

export interface TableCellProps extends Omit<RAC.CellProps, RemovedProps> {
  /**
   * The content of the cell.
   */
  children?: ReactNode;
  /**
   * Horizontal text alignment of the cell content.
   * @default 'left'
   */
  align?: keyof typeof textAlign;
}

// Component
// ---------------
const TableCell = ({ children, align = 'left', ...props }: TableCellProps) => {
  const {
    classNames,
    overflow = 'wrap',
    allowTextSelection = false,
  } = useTableContext();
  const { selectionMode } = useTableOptions();

  return (
    <Cell
      className={cn(
        classNames.cell,
        textAlign[align],
        overflow === 'truncate' ? 'max-w-0 truncate' : 'wrap-break-word'
      )}
      {...props}
    >
      {allowTextSelection && selectionMode !== 'none' ? (
        <TableSelectableCell>{children}</TableSelectableCell>
      ) : (
        children
      )}
    </Cell>
  );
};

export { TableCell };
