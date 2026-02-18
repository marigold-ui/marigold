import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import {
  Table as RACTable,
  ResizableTableContainer,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { useActionBar } from '../ActionBar/useActionBar';
import type { Selection } from '../types';
import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { renderDragPreview } from './TableDragPreview';
import { renderDropIndicator } from './TableDropIndicator';
import { TableEditableCell } from './TableEditableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

// Remove props that we want to customize
type RemovedProps = 'className' | 'style' | 'selectionBehavior' | 'render';

export interface TableProps extends Omit<RAC.TableProps, RemovedProps> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: 'compact' | 'default' | 'spacious' | (string & {});
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
  alignY?: 'top' | 'middle' | 'bottom' | 'baseline';
  /**
   * Render function that receives the current selection and returns an ActionBar.
   * When provided, the Table manages selection wiring and ActionBar positioning automatically.
   */
  actionBar?: (selectedKeys: Selection) => ReactNode;
}

const _Table = ({
  variant,
  size,
  overflow = 'wrap',
  allowTextSelection = false,
  alignY = 'middle',
  actionBar,
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys: defaultSelectedKeysProp,
  onSelectionChange: onSelectionChangeProp,
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
      alignY,
    }),
    [classNames, variant, size, overflow, allowTextSelection, alignY]
  );

  const { selectedKeys, onSelectionChange, actionBarHeight, actionBarOverlay } =
    useActionBar({
      selectedKeys: selectedKeysProp as Selection | undefined,
      defaultSelectedKeys: defaultSelectedKeysProp as Selection | undefined,
      onSelectionChange: onSelectionChangeProp,
      actionBar,
    });

  return (
    <TableContext.Provider value={ctx}>
      <ResizableTableContainer
        className={cn('w-full')}
        style={{
          paddingBottom: actionBarHeight
            ? `calc(${actionBarHeight}px + var(--actionbar-offset, 8px))`
            : undefined,
          scrollPaddingBottom: actionBarHeight
            ? `calc(${actionBarHeight}px + var(--actionbar-offset, 8px))`
            : undefined,
        }}
      >
        <RACTable
          className={cn('group/table', classNames.table)}
          selectionBehavior="toggle"
          selectedKeys={selectedKeys}
          defaultSelectedKeys={actionBar ? undefined : defaultSelectedKeysProp}
          onSelectionChange={onSelectionChange}
          {...props}
        />
        {actionBarOverlay}
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
