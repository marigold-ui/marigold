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
   * A string representation of the cell's contents, used to give the row an
   * accessible name and to support type to select.
   *
   * Derived automatically when the cell's content is a plain string or number.
   * Set it by hand for a composite cell, such as one wrapping several `<Text>`
   * nodes, since its content cannot be read as text. Only cells in a `rowHeader`
   * column name the row, so those are the ones that need it.
   *
   * Type to select matches from the *start* of the value, so lead with what a
   * user would type. `"Jane Doe"` is findable by name, `"4711 Jane Doe"` only by
   * its number.
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
      {({ columnIndex, isTreeColumn, hasChildItems, isExpanded }) => {
        const content = (
          <TableCellContent
            columnIndex={columnIndex}
            alignX={alignX}
            cellOverflow={cellOverflow}
            className={isTreeColumn ? 'col-start-2 min-w-0' : undefined}
            // This component body runs only in React Aria's collection pass,
            // where nothing is mounted, so the warning has to be raised from the
            // content, which is what actually renders.
            missingTextValue={resolvedTextValue === undefined}
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
