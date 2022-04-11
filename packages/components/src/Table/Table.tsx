import React, { RefObject, useRef } from 'react';
import { useTable, TableProps as TablePropsStately } from '@react-aria/table';
import { TableStateProps, useTableState } from '@react-stately/table';

import { useComponentStyles } from '@marigold/system';

import { Box } from '../Box';

import { TableCell, TableCellProps } from './TableCell';
import { TableColumnHeader, TableColumnHeaderProps } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableRowGroup } from './TableRowGroup';

// Theme Extension
// ---------------
export interface TableThemeExtension<Value> {
  table?: {
    [key: string]: Value;
  };
}

// Props
// ---------------
export interface TableProps
  extends TableStateProps<object>,
    TablePropsStately<object> {
  align?: TableCellProps['align'];
  alignHeader?: TableColumnHeaderProps['align'];
}

// Table Component
// ---------------
export const Table: React.FC<TableProps> = ({
  align,
  alignHeader,
  ...props
}) => {
  const { selectionMode, selectionBehavior } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === 'multiple' && selectionBehavior !== 'replace',
  });

  const ref = useRef<HTMLElement>();
  const { collection } = state;
  const { gridProps } = useTable(props, state, ref as RefObject<HTMLElement>);

  const styles = useComponentStyles(
    'Table',
    {},
    { parts: ['table', 'header', 'row', 'cell'] }
  );

  return (
    <Box
      as="table"
      __baseCSS={styles.table}
      {...gridProps}
      ref={ref as RefObject<HTMLTableElement>}
    >
      <TableRowGroup type="thead">
        {collection.headerRows.map(headerRow => (
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
        {[...collection.body.childNodes].map(row => (
          <TableRow styles={styles.row} key={row.key} item={row} state={state}>
            {[...row.childNodes].map(cell => (
              <TableCell
                key={cell.key}
                styles={styles.cell}
                item={cell}
                state={state}
                isSelectionCell={cell.props.isSelectionCell}
                align={align}
              />
            ))}
          </TableRow>
        ))}
      </TableRowGroup>
    </Box>
  );
};
