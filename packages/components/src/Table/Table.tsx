import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import {
  Table as RACTable,
  ResizableTableContainer,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { TableDragPreview, renderDragPreview } from './TableDragPreview';
import { TableDropIndicator, renderDropIndicator } from './TableDropIndicator';
import { TableEditableCell } from './TableEditableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

// Remove props that we want to customize
type RemovedProps = 'className' | 'style' | 'selectionBehavior';

export interface TableProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: string;
  /**
   * Controls how cell content overflows. Works best when columns have defined width props.
   * @default 'wrap'
   */
  overflow?: 'truncate' | 'wrap';
  /**
   * Controls whether text selection is allowed in cells.
   * @default false
   */
  allowTextSelection?: boolean;
  /**
   * Controls vertical alignment of cell content.
   * @default 'middle'
   */
  verticalAlign?: 'top' | 'middle' | 'bottom' | 'baseline';
}

const _Table = ({
  variant,
  size,
  overflow = 'wrap',
  allowTextSelection = false,
  verticalAlign = 'middle',
  ...props
}: TableProps) => {
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });

  const ctx = useMemo(
    () => ({
      classNames,
      variant,
      size,
      overflow,
      allowTextSelection,
      verticalAlign,
    }),
    [classNames, variant, size, overflow, allowTextSelection, verticalAlign]
  );

  return (
    <TableContext.Provider value={ctx}>
      <ResizableTableContainer className="w-full">
        <RACTable
          className={cn('group/table', classNames.table)}
          selectionBehavior="toggle"
          {...props}
        />
      </ResizableTableContainer>
    </TableContext.Provider>
  );
};

const Table = Object.assign(_Table, {
  Header: TableHeader,
  Column: TableColumn,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  EditableCell: TableEditableCell,

  // Drag and Drop
  DropIndicator: TableDropIndicator,
  DragPreview: TableDragPreview,
  renderDropIndicator: renderDropIndicator,
  renderDragPreview: renderDragPreview,
});

export { Table };

// Export types
// ---------------
export type { TableHeaderProps } from './TableHeader';
export type { TableColumnProps } from './TableColumn';
export type { TableBodyProps } from './TableBody';
export type { TableRowProps } from './TableRow';
export type { TableCellProps } from './TableCell';
export type { TableDropIndicatorProps } from './TableDropIndicator';
export type { TableDragPreviewProps } from './TableDragPreview';
export type { TableEditableCellProps } from './TableEditableCell';
