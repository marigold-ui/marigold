import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components';
import { textAlign } from '@marigold/system';
import { useTableContext } from './Context';
import { TableCellContent } from './TableCellContent';

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
  alignX?: keyof typeof textAlign;
  /**
   * Text overflow behavior for this specific cell. Overrides the table-level overflow setting.
   * @default undefined (inherits from table)
   */
  overflow?: 'truncate' | 'wrap';
}

// Component
// ---------------
const TableCell = ({
  children,
  alignX,
  overflow: cellOverflow,
  ...props
}: TableCellProps) => {
  const { classNames } = useTableContext();

  return (
    <Cell className={classNames.cell} {...props}>
      {({ columnIndex }) => (
        <TableCellContent
          columnIndex={columnIndex}
          alignX={alignX}
          cellOverflow={cellOverflow}
        >
          {children}
        </TableCellContent>
      )}
    </Cell>
  );
};

export { TableCell };
