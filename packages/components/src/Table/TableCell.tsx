import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components/Table';
import { cn, textAlign, verticalAlign } from '@marigold/system';
import { useTableContext } from './Context';
import { TableCellContent } from './TableCellContent';
import { TableTreeColumn } from './TableTreeColumn';
import { resolveTextValue } from './textValue';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children';

export interface TableCellProps extends Omit<RAC.CellProps, RemovedProps> {
  /**
   * The content of the cell.
   */
  children?: ReactNode;
  /**
   * Text that names the row for type to select and screen readers. Derived from
   * plain string or number content, so set it only for composite content in a
   * `rowHeader` column.
   */
  textValue?: RAC.CellProps['textValue'];
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
  textValue,
  ...props
}: TableCellProps) => {
  const { classNames, alignY = 'middle' } = useTableContext();

  const resolvedTextValue = resolveTextValue(textValue, children);

  return (
    <Cell
      className={cn(classNames.cell, verticalAlign[alignY])}
      textValue={resolvedTextValue}
      {...props}
    >
      {({ id, columnIndex, isTreeColumn, hasChildItems, isExpanded }) => {
        const content = (
          <TableCellContent
            columnIndex={columnIndex}
            cellKey={id}
            alignX={alignX}
            cellOverflow={cellOverflow}
            className={isTreeColumn ? 'col-start-2 min-w-0' : undefined}
            // This component body runs only in React Aria's collection pass,
            // where nothing is mounted, so the warning has to be raised from the
            // content, which is what actually renders.
            missingTextValueOn={
              resolvedTextValue === undefined ? 'Table.Cell' : undefined
            }
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
