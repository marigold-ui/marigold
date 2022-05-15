import React, { useRef } from 'react';
import { useTable, TableProps as AriaTableProps } from '@react-aria/table';
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableStateProps,
  useTableState,
} from '@react-stately/table';

import { ThemeExtensionsWithParts, useComponentStyles } from '@marigold/system';

import { Box } from '../Box';

import { TableCell } from './TableCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';
import { TableContext } from './Context';

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
}

// Table Component
// ---------------
export const Table: Table = ({ variant, size, ...props }: TableProps) => {
  const tableRef = useRef(null);
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      props.selectionMode === 'multiple' &&
      props.selectionBehavior !== 'replace',
  });
  const { gridProps } = useTable(props, state, tableRef);

  const styles = useComponentStyles(
    'Table',
    { variant, size },
    { parts: ['table', 'header', 'row', 'cell'] }
  );

  return (
    <TableContext.Provider value={{ state, styles }}>
      <Box as="table" ref={tableRef} css={styles.table} {...gridProps}>
        <TableRowGroup as="thead">
          {state.collection.headerRows.map(headerRow => (
            <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
              {[...headerRow.childNodes].map(column => (
                <TableColumnHeader
                  key={column.key}
                  item={column}
                  state={state}
                  isSelectionColumn={column.props.isSelectionCell}
                  css={styles.header}
                />
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup as="tbody">
          {[...state.collection.body.childNodes].map(row => (
            <TableRow css={styles.row} key={row.key} item={row} state={state}>
              {[...row.childNodes].map(cell => (
                <TableCell
                  key={cell.key}
                  item={cell}
                  state={state}
                  isSelectionCell={cell.props.isSelectionCell}
                  css={styles.cell}
                />
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </Box>
    </TableContext.Provider>
  );
};

// Export collection components to conveniently have access to them.
Table.Body = TableBody;
Table.Cell = Cell;
Table.Column = Column;
Table.Header = TableHeader;
Table.Row = Row;

/**
 * Necessary since TypeScript can not infer the
 * types of the @react-stately components.
 */
interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof TableBody;
  Cell: typeof Cell;
  Column: typeof Column;
  Header: typeof TableHeader;
  Row: typeof Row;
}
