import React, { useRef } from 'react';
import { useTable, AriaTableProps } from '@react-aria/table';
import {
  Cell,
  Column,
  ColumnProps,
  Row,
  TableBody as Body,
  TableHeader as Header,
  TableStateProps,
  useTableState,
} from '@react-stately/table';

import {
  Box,
  CSSObject,
  ThemeExtensionsWithParts,
  useComponentStyles,
} from '@marigold/system';

import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeader } from './TableHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableSelectAllCell } from './TableSelectAllCell';
import { element } from 'packages/system/src/components/Global/normalize';

// Theme Extension
// ---------------
export interface TableThemeExtension
  extends ThemeExtensionsWithParts<
    'Table',
    ['table', 'header', 'row', 'cell']
  > {}

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

export interface TableColumnProps<T> extends ColumnProps<T> {
  /**
   * The alignment of the column's contents relative to its allotted width.
   * @default 'start'
   */

  align?: 'start' | 'center' | 'end';
}

// Table Component
// ---------------
export const Table: Table = ({
  variant,
  size,
  stretch,
  ...props
}: TableProps) => {
  const tableRef = useRef(null);
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' &&
      // TODO: It this necessary?
      props.selectionBehavior !== 'replace',
  });
  const { gridProps } = useTable(props, state, tableRef);

  const styles = useComponentStyles(
    'Table',
    { variant, size },
    { parts: ['table', 'header', 'row', 'cell'] }
  );

  const { collection } = state;
  //let { column } = props;

  const columnProps = collection.headerRows.map(headerRow =>
    [...headerRow.childNodes].map(
      column => column.props as TableColumnProps<unknown>
    )
  );
  //const columnProps = column.props as TableColumnProps<unknown>;

  const abbb = columnProps.map(a => a.map(b => b.align));
  console.log(abbb);
  return (
    <TableContext.Provider value={{ state, styles }}>
      <Box
        as="table"
        ref={tableRef}
        __baseCSS={{
          borderCollapse: 'collapse',
          width: stretch ? '100%' : undefined,
        }}
        css={{ textAlign: props.children.align, ...styles.table }}
        {...gridProps}
      >
        <TableHeader>
          {collection.headerRows.map(headerRow => (
            <TableHeaderRow key={headerRow.key} item={headerRow}>
              {[...headerRow.childNodes].map(column =>
                column.props?.isSelectionCell ? (
                  <TableSelectAllCell key={column.key} column={column} />
                ) : (
                  <TableColumnHeader key={column.key} column={column} />
                )
              )}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody>
          {[...collection.body.childNodes].map(row => (
            <TableRow key={row.key} row={row}>
              {[...row.childNodes].map(cell =>
                cell.props?.isSelectionCell ? (
                  <TableCheckboxCell key={cell.key} cell={cell} />
                ) : (
                  <TableCell key={cell.key} cell={cell} />
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Box>
    </TableContext.Provider>
  );
};

const MarigoldColumn = Column as <T>(props: TableColumnProps<T>) => JSX.Element;

// Export collection components to conveniently have access to them.
Table.Body = Body;
Table.Cell = Cell;
Table.Column = MarigoldColumn;
Table.Header = Header;
Table.Row = Row;

/**
 * Necessary since TypeScript can not infer the
 * types of the @react-stately components.
 */
interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof Body;
  Cell: typeof Cell;
  Column: typeof MarigoldColumn;
  Header: typeof Header;
  Row: typeof Row;
}
