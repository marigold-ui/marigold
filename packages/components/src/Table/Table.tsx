import type { ComponentProps, FocusEvent, ReactNode } from 'react';
import { use, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import {
  Table as RACTable,
  ResizableTableContainer,
  TableColumnResizeStateContext,
  TableStateContext,
} from 'react-aria-components/Table';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { announce } from '@react-aria/live-announcer';
import { getScrollParent } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { useActionBar } from '../ActionBar/useActionBar';
import { intlMessages } from '../intl/messages';
import type { Selection } from '../types';
import { TableContext } from './Context';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn } from './TableColumn';
import { renderDragPreview } from './TableDragPreview';
import { renderDropIndicator } from './TableDropIndicator';
import { TableEditableCell } from './TableEditableCell';
import { TableExpandableRows } from './TableExpandableRows';
import { TableFooter } from './TableFooter';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

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
   * Whether the table's data is loading. Marks the table as busy and announces
   * the loading state to screen readers.
   * @default false
   */
  loading?: boolean;
  /**
   * Render function that receives the current selection and returns an ActionBar.
   * When provided, the Table manages selection wiring and ActionBar positioning automatically.
   */
  actionBar?: (selectedKeys: Selection) => ReactNode;
  /**
   * The `id` of the column that carries the hierarchy and shows the expand
   * control. Setting it enables expandable rows, which also changes the table's
   * role from `grid` to `treegrid`.
   */
  treeColumn?: RAC.TableProps['treeColumn'];
  /**
   * The keys of the expanded rows (controlled).
   */
  expandedKeys?: RAC.TableProps['expandedKeys'];
  /**
   * The keys of the initially expanded rows (uncontrolled).
   */
  defaultExpandedKeys?: RAC.TableProps['defaultExpandedKeys'];
  /**
   * Handler that is called when rows are expanded or collapsed.
   */
  onExpandedChange?: RAC.TableProps['onExpandedChange'];
}

// Helper
// ---------------
const isRelative = (size: unknown) =>
  typeof size === 'string' && size.endsWith('%');

// Pixel sizes only: a number or a numeric string. `fr` and `%` return 0.
const staticSize = (size: unknown) => {
  if (typeof size === 'number') return size;
  if (typeof size === 'string' && /^\d+(\.\d+)?$/.test(size))
    return Number(size);
  return 0;
};

/**
 * Scrolls a focused row clear of the pinned ActionBar. The bar pins to the
 * page or a `Scrollable`, so `scroll-padding` on the table can't do it.
 */
const scrollFocusedRowClearOfActionBar = (e: FocusEvent<HTMLElement>) => {
  const row = (e.target as Element).closest('[role=row]');
  const bar = e.currentTarget.querySelector<HTMLElement>('[data-actionbar]');
  if (!row || !bar) return;

  // After React Aria has scrolled the row into view.
  requestAnimationFrame(() => {
    // The bar's own pin offset doubles as the gap to keep above it.
    const gap = parseFloat(getComputedStyle(bar).bottom) || 0;
    const overlap =
      row.getBoundingClientRect().bottom -
      (bar.getBoundingClientRect().top - gap);
    if (overlap <= 0) return;

    getScrollParent(row).scrollBy({ top: overlap });
  });
};

interface TableElementProps extends ComponentProps<'table'> {
  loading: boolean;
  onMinWidthChange: (width: number) => void;
}

/**
 * The `<table>` is the one Marigold element React Aria renders inside its own
 * providers, so it is where the column layout can be read.
 */
const TableElement = ({
  loading,
  onMinWidthChange,
  ...props
}: TableElementProps) => {
  const state = use(TableStateContext);
  const layout = use(TableColumnResizeStateContext);

  // Includes React Aria's 75px default and the selection and drag columns.
  // Percentage minimums resolve against the container's width, which this
  // value sets, so counting them would feed the width back into itself.
  // A static `defaultWidth` renders at that width, so it counts in full.
  const minWidth =
    state && layout
      ? state.collection.columns.reduce(
          (sum, column) =>
            isRelative(column.props.minWidth)
              ? sum
              : sum +
                Math.max(
                  layout.getColumnMinWidth(column.key),
                  staticSize(column.props.defaultWidth)
                ),
          0
        )
      : undefined;

  useLayoutEffect(() => {
    if (minWidth === undefined || !Number.isFinite(minWidth)) return;
    onMinWidthChange(minWidth);
  }, [minWidth, onMinWidthChange]);

  return <table {...props} aria-busy={loading || undefined} />;
};

const _Table = ({
  variant,
  size,
  overflow = 'wrap',
  allowTextSelection = false,
  alignY = 'middle',
  loading = false,
  actionBar,
  treeColumn,
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
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  const [warnedMissingTextValue] = useState(() => new Set<string>());
  const [minTableWidth, setMinTableWidth] = useState<number>();

  const ctx = useMemo(
    () => ({
      classNames,
      variant,
      size,
      overflow,
      allowTextSelection,
      alignY,
      treeColumn,
      warnedMissingTextValue,
    }),
    [
      classNames,
      variant,
      size,
      overflow,
      allowTextSelection,
      alignY,
      treeColumn,
      warnedMissingTextValue,
    ]
  );

  const { selectedKeys, onSelectionChange, actionBarHeight, actionBarOverlay } =
    useActionBar({
      selectedKeys: selectedKeysProp as Selection | undefined,
      defaultSelectedKeys: defaultSelectedKeysProp as Selection | undefined,
      onSelectionChange: onSelectionChangeProp,
      actionBar,
    });

  // A live region rendered with the table would be inserted with its text
  // already in it on mount, which screen readers skip. The shared announcer's
  // region exists ahead of time, so the first load is announced too.
  useEffect(() => {
    if (!loading) return;
    announce(stringFormatter.format('loadingMessage'), 'polite');
  }, [loading, stringFormatter]);

  return (
    <TableContext value={ctx}>
      <div
        onFocus={actionBarHeight ? scrollFocusedRowClearOfActionBar : undefined}
      >
        <ResizableTableContainer
          // Containment keeps the measured width from following the table (DST-1836).
          className="w-full [contain:inline-size]"
          style={{ minWidth: minTableWidth }}
        >
          <RACTable
            className={cn('group/table', classNames.table)}
            treeColumn={treeColumn}
            selectionBehavior="toggle"
            selectedKeys={selectedKeys}
            defaultSelectedKeys={
              actionBar ? undefined : defaultSelectedKeysProp
            }
            onSelectionChange={onSelectionChange}
            render={domProps => (
              <TableElement
                // Only a virtualized table renders a `<div>`, and Marigold's never is.
                {...(domProps as ComponentProps<'table'>)}
                loading={loading}
                onMinWidthChange={setMinTableWidth}
              />
            )}
            {...props}
          />
          {actionBar && (
            <>
              {/* Gap between the last row and the bar. */}
              <div
                aria-hidden
                className={classNames.actionBarSpacer}
                style={{
                  height: actionBarHeight ? 'var(--actionbar-offset, 8px)' : 0,
                }}
              />
              {actionBarOverlay}
              {/* Cancels the bar's own height, then slides open to it, so the
                  content below moves smoothly instead of jumping. */}
              <div
                aria-hidden
                className={classNames.actionBarSpacer}
                style={{ marginTop: -actionBarHeight, height: actionBarHeight }}
              />
            </>
          )}
        </ResizableTableContainer>
      </div>
    </TableContext>
  );
};

const Table = Object.assign(_Table, {
  Header: TableHeader,
  Column: TableColumn,
  Body: TableBody,
  Row: TableRow,
  ExpandableRows: TableExpandableRows,
  Cell: TableCell,
  EditableCell: TableEditableCell,
  Footer: TableFooter,

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
export type { TableExpandableRowsProps } from './TableExpandableRows';
export type { TableCellProps } from './TableCell';
export type { TableDropIndicatorProps } from './TableDropIndicator';
export type { TableDragPreviewProps } from './TableDragPreview';
export type { TableEditableCellProps } from './TableEditableCell';
export type { TableFooterProps } from './TableFooter';
