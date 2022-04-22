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

import { TableCell, TableCellProps } from './TableCell';
import { TableColumnHeader, TableColumnHeaderProps } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';

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
  extends Pick<AriaTableProps<object>, 'onRowAction' | 'onCellAction'>,
    TableStateProps<object> {
  align?: TableCellProps['align'];
  alignHeader?: TableColumnHeaderProps['align'];
  variant?: string;
  size?: string;
}

// Table Component
// ---------------
export const Table: Table = ({
  align,
  alignHeader,
  variant,
  size,
  ...props
}: TableProps) => {
  // Setup table state and mode
  const showSelectionCheckboxes =
    props.selectionMode === 'multiple' && props.selectionBehavior !== 'replace';
  const state = useTableState({
    ...props,
    showSelectionCheckboxes,
  });

  const ref = useRef(null);
  const { gridProps } = useTable(props, state, ref);

  const styles = useComponentStyles(
    'Table',
    { variant, size },
    { parts: ['table', 'header', 'row', 'cell'] }
  );

  return (
    <Box as="table" ref={ref} __baseCSS={styles.table} {...gridProps}>
      <TableRowGroup type="thead">
        {state.collection.headerRows.map(headerRow => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map(column => (
              <TableColumnHeader
                styles={styles.header}
                key={column.key}
                item={column}
                state={state}
                isSelectionColumn={column.props.isSelectionCell}
                align={alignHeader}
              />
            ))}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...state.collection.body.childNodes].map(row => (
          <TableRow styles={styles.row} key={row.key} item={row} state={state}>
            {[...row.childNodes].map(cell => (
              <TableCell
                key={cell.key}
                item={cell}
                state={state}
                isSelectionCell={cell.props.isSelectionCell}
                align={align}
                css={styles.cell}
              />
            ))}
          </TableRow>
        ))}
      </TableRowGroup>
    </Box>
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
 * types of the @react-stately components correctly.
 */
interface Table {
  (props: TableProps): JSX.Element;
  Body: typeof TableBody;
  Cell: typeof Cell;
  Column: typeof Column;
  Header: typeof TableHeader;
  Row: typeof Row;
}
