import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components/Table';
import { cn, textAlign, verticalAlign } from '@marigold/system';
import { useTableContext } from './Context';
import { TableCellContent } from './TableCellContent';
import { TableExpandButton } from './TableExpandButton';

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
            className={isTreeColumn ? 'min-w-0 flex-1' : undefined}
          >
            {children}
          </TableCellContent>
        );

        if (!isTreeColumn) return content;

        // The leading gutter and any deeper-level indentation live on this
        // wrapper rather than on the cell's own padding, so they compose with
        // `--cell-edge-padding` instead of fighting it.
        return (
          <div className={classNames.treeIndent}>
            {hasChildItems ? (
              <TableExpandButton expanded={isExpanded} />
            ) : (
              // Holds the gutter open on rows that have no control, so a group
              // row, its children and a root-level row all put their value at
              // the same x and the column stays scannable.
              <span
                aria-hidden="true"
                className={cn(classNames.expandButton, 'invisible')}
              />
            )}
            {content}
          </div>
        );
      }}
    </Cell>
  );
};

export { TableCell };
