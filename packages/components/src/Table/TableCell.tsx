import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell, useTableOptions } from 'react-aria-components';
import { cn, textAlign, verticalAlign } from '@marigold/system';
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
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   * @default undefined (inherits from table)
   */
  overflow?: 'truncate' | 'wrap';
  /**
   * Vertical alignment of cell content. Overrides the table-level verticalAlign setting.
   * @default undefined (inherits from table)
   */
  verticalAlign?: keyof typeof verticalAlign;
}

// Component
// ---------------
const TableCell = ({
  children,
  align = 'left',
  overflow: cellOverflow,
  verticalAlign: cellVerticalAlign,
  ...props
}: TableCellProps) => {
  const {
    classNames,
    overflow: tableOverflow = 'wrap',
    allowTextSelection = false,
    verticalAlign: tableVerticalAlign = 'middle',
  } = useTableContext();
  const { selectionMode } = useTableOptions();

  // Cell-level overrides table-level
  const overflow = cellOverflow ?? tableOverflow;
  const vAlign = cellVerticalAlign ?? tableVerticalAlign;

  return (
    <Cell
      className={cn(
        classNames.cell,
        textAlign[align],
        verticalAlign[vAlign],
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
