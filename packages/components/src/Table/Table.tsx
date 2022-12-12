import React, { useRef } from 'react';
import { useTable, AriaTableProps } from '@react-aria/table';
import {
  Cell,
  Column,
  Row,
  RowProps as ReactAiaRowProps,
  TableBody as Body,
  TableHeader as Header,
  TableStateProps,
  useTableState,
} from '@react-stately/table';

import {
  Box,
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

  const styles = useComponentStyles(
    'Table',
    { variant, size },
    { parts: ['table', 'header', 'row', 'cell'] }
  );

  const { collection } = state;

  return (
    <TableContext.Provider value={{ state, interactive, styles }}>
      <Box
        as="table"
        ref={tableRef}
        __baseCSS={{
          display: stretch ? 'table' : 'block',
          width: stretch ? '100%' : undefined,
          borderCollapse: 'collapse',
          overflow: 'auto',
          whiteSpace: 'nowrap',
        }}
        css={styles.table}
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

// Export collection components to conveniently have access to them.
Table.Body = Body;
Table.Cell = Cell;
Table.Column = Column;
Table.Header = Header;
Table.Row = Row;

export interface RowProps extends ReactAiaRowProps {
  variant?: string;
  size?: string;
}

/**
 * Necessary since TypeScript can not infer the
 * types of the @react-stately components.
 */
interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof Body;
  Cell: typeof Cell;
  Column: typeof Column;
  Header: typeof Header;
  Row: (props: RowProps) => JSX.Element;
}
