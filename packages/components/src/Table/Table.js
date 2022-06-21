import React, { useRef } from 'react';
import { useTable } from '@react-aria/table';
import {
  Cell,
  Column,
  Row,
  TableBody as Body,
  TableHeader as Header,
  useTableState,
} from '@react-stately/table';
import { Box, useComponentStyles } from '@marigold/system';
import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableColumnHeader } from './TableColumnHeader';
import { TableHeader } from './TableHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableSelectAllCell } from './TableSelectAllCell';
// Table Component
// ---------------
export const Table = ({ variant, size, stretch, ...props }) => {
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
  return React.createElement(
    TableContext.Provider,
    { value: { state, styles } },
    React.createElement(
      Box,
      {
        as: 'table',
        ref: tableRef,
        __baseCSS: {
          borderCollapse: 'collapse',
          width: stretch ? '100%' : undefined,
        },
        css: styles.table,
        ...gridProps,
      },
      React.createElement(
        TableHeader,
        null,
        collection.headerRows.map(headerRow =>
          React.createElement(
            TableHeaderRow,
            { key: headerRow.key, item: headerRow },
            [...headerRow.childNodes].map(column => {
              var _a;
              return (
                (_a = column.props) === null || _a === void 0
                  ? void 0
                  : _a.isSelectionCell
              )
                ? React.createElement(TableSelectAllCell, {
                    key: column.key,
                    column: column,
                  })
                : React.createElement(TableColumnHeader, {
                    key: column.key,
                    column: column,
                  });
            })
          )
        )
      ),
      React.createElement(
        TableBody,
        null,
        [...collection.body.childNodes].map(row =>
          React.createElement(
            TableRow,
            { key: row.key, row: row },
            [...row.childNodes].map(cell => {
              var _a;
              return (
                (_a = cell.props) === null || _a === void 0
                  ? void 0
                  : _a.isSelectionCell
              )
                ? React.createElement(TableCheckboxCell, {
                    key: cell.key,
                    cell: cell,
                  })
                : React.createElement(TableCell, { key: cell.key, cell: cell });
            })
          )
        )
      )
    )
  );
};
// Export collection components to conveniently have access to them.
Table.Body = Body;
Table.Cell = Cell;
Table.Column = Column;
Table.Header = Header;
Table.Row = Row;
//# sourceMappingURL=Table.js.map
