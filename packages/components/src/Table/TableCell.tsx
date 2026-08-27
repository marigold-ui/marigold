import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components/Table';
import { cn, textAlign, verticalAlign } from '@marigold/system';
import { useTableContext } from './Context';
import { TableCellContent } from './TableCellContent';
import { TableTreeColumn } from './TableTreeColumn';

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
  const { classNames, alignY = 'middle' } = useTableContext();

  return (
    <Cell className={cn(classNames.cell, verticalAlign[alignY])} {...props}>
      {({ columnIndex, isTreeColumn, hasChildItems, isExpanded }) => {
        const content = (
          <TableCellContent
            columnIndex={columnIndex}
            alignX={alignX}
            cellOverflow={cellOverflow}
            className={isTreeColumn ? 'col-start-2 min-w-0' : undefined}
          >
            {children}
          </TableCellContent>
        );

        if (!isTreeColumn) return content;

        return (
          <TableTreeColumn
            hasChildItems={hasChildItems}
            isExpanded={isExpanded}
          >
            {content}
          </TableTreeColumn>
        );
      }}
    </Cell>
  );
};

export { TableCell };
