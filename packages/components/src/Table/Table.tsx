import { useRef } from 'react';

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

  /**
   * Stretch table to fill the container.
   * @default false
   */
  stretch?: boolean;

  /**
   * Make the column sticky to the top of the table.
   * @default true
   */
  stickyHeader?: boolean;

  /**
   * Disable keyboard navigation. Use if you have input fields in your table. Be aware that this is bad for accessibility.
   * @default false
   */
  disableKeyboardNavigation?: boolean;
}

// Table Component
// ---------------
export const Table: Table = ({
  variant,
  size,
  stretch = false,
  selectionMode = 'none',
  disableKeyboardNavigation = false,
  stickyHeader,
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

  /**
   * Behavior is a bit flacky with the table when using a keyboard
   * so we test here for undefined here to be save.
   */
  if (disableKeyboardNavigation !== undefined) {
    state.isKeyboardNavigationDisabled = disableKeyboardNavigation;
  }

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
          'group/table',
          'border-collapse whitespace-nowrap',
          stretch ? 'table w-full' : 'block',
          classNames.table
        )}
        {...gridProps}
      >
        <TableHeader stickyHeader={stickyHeader}>
          {collection.headerRows.map(headerRow => (
            <TableHeaderRow key={headerRow.key} item={headerRow}>
              {[...collection.getChildren!(headerRow.key)].map(column =>
                column.props?.isSelectionCell ? (
                  <TableSelectAllCell
                    width={column.props?.width}
                    key={column.key}
                    column={column}
                    align={column.props?.align}
                  />
                ) : (
                  <TableColumnHeader
                    width={column.props?.width}
                    key={column.key}
                    column={column}
                    align={column.props?.align}
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
                  {[...collection.getChildren!(row.key)].map((cell, index) => {
                    const currentColumn = collection.columns[index];
                    return cell.props?.isSelectionCell ? (
                      <TableCheckboxCell key={cell.key} cell={cell} />
                    ) : (
                      <TableCell
                        align={currentColumn.props?.align}
                        key={cell.key}
                        cell={cell}
                      />
                    );
                  })}
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
interface ColumnProps extends Omit<ColumnBaseProps<any>, 'width'>, WidthProp {
  /**
   * Control the alignment of Column.
   * @default left
   */
  align?: Exclude<JSX.IntrinsicElements['td']['align'], 'char'>;
}

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
