import React, { useRef } from 'react';

import { AriaTableProps, useTable } from '@react-aria/table';

import {
  TableBody as Body,
  Cell,
  Column,
  ColumnProps as ColumnBaseProps,
  TableHeader as Header,
  RowProps as ReactAiaRowProps,
  Row,
  TableStateProps,
  useTableState,
} from '@react-stately/table';

import { WidthProp, cn, useClassNames } from '@marigold/system';

import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeader } from './TableHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableSelectAllCell } from './TableSelectAllCell';

// Props
// ---------------
export interface TableProps
  extends Pick<
      AriaTableProps<object>,
      'focusMode' | 'onRowAction' | 'onCellAction'
    >,
    Omit<TableStateProps<object>, 'showSelectionCheckboxes'> {
  variant?: string;
  size?: string;
  stretch?: boolean;
}

// Table Component
// ---------------
export const Table: Table = ({
  variant,
  size,
  stretch,
  selectionMode = 'none',
  ...props
}: TableProps) => {
  const interactive = selectionMode !== 'none';
  const tableRef = useRef(null);
  const state = useTableState({
    ...props,
    selectionMode,
    showSelectionCheckboxes:
      selectionMode === 'multiple' &&
      // TODO: It this necessary?
      props.selectionBehavior !== 'replace',
  });
  const { gridProps } = useTable(props, state, tableRef);
  const classNames = useClassNames({
    component: 'Table',
    variant,
    size,
  });

  const { collection } = state;

  return (
    <TableContext.Provider
      value={{ state, interactive, classNames, variant, size }}
    >
      <table
        ref={tableRef}
        className={cn(
          'border-collapse overflow-auto whitespace-nowrap',
          stretch ? 'table w-full' : 'block',
          classNames.table
        )}
        {...gridProps}
      >
        <TableHeader>
          {collection.headerRows.map(headerRow => (
            <TableHeaderRow key={headerRow.key} item={headerRow}>
              {[...collection.getChildren!(headerRow.key)].map(column =>
                column.props?.isSelectionCell ? (
                  <TableSelectAllCell
                    width={column.props?.width}
                    key={column.key}
                    column={column}
                  />
                ) : (
                  <TableColumnHeader
                    width={column.props?.width}
                    key={column.key}
                    column={column}
                  />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody>
          {...collection.rows.map(
            row =>
              row.type === 'item' && (
                <TableRow key={row.key} row={row}>
                  {[...collection.getChildren!(row.key)].map(cell =>
                    cell.props?.isSelectionCell ? (
                      <TableCheckboxCell key={cell.key} cell={cell} />
                    ) : (
                      <TableCell key={cell.key} cell={cell} />
                    )
                  )}
                </TableRow>
              )
          )}
        </TableBody>
      </table>
    </TableContext.Provider>
  );
};

// Export collection components to conveniently have access to them.
Table.Body = Body;
Table.Cell = Cell;
Table.Column = Column as (props: ColumnProps) => JSX.Element;
Table.Header = Header;
Table.Row = Row;

export interface RowProps extends ReactAiaRowProps<any> {
  variant?: string;
  size?: string;
}

// overriding the column width with WidthProps width
interface ColumnProps extends Omit<ColumnBaseProps<any>, 'width'>, WidthProp {}

/**
 * Necessary since TypeScript can not infer the
 * types of the @react-stately components.
 */

interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof Body;
  Cell: typeof Cell;
  Header: typeof Header;
  Column: (props: ColumnProps) => JSX.Element;
  Row: (props: RowProps) => JSX.Element;
}
