import type {
  ComponentProps,
  FocusEvent,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Children,
  Fragment,
  isValidElement,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import {
  Table as RACTable,
  ResizableTableContainer,
  TableColumnResizeStateContext,
  TableStateContext,
} from 'react-aria-components/Table';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { announce } from '@react-aria/live-announcer';
import { getScrollParent, useResizeObserver } from '@react-aria/utils';
import { cn, useClassNames } from '@marigold/system';
import { useActionBar } from '../ActionBar/useActionBar';
import { intlMessages } from '../intl/messages';
import type { Selection } from '../types';
import { useDevWarning } from '../utils/useDevWarning';
import type { SkeletonColumn, StickyEdge } from './Context';
import {
  TableContext,
  TableSkeletonContext,
  TableStickyContext,
  isSkeletonRowKey,
  noStickyColumns,
} from './Context';
import { TableBody, type TableBodyProps, isEmptyBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableColumn, type TableColumnProps } from './TableColumn';
import { renderDragPreview } from './TableDragPreview';
import { renderDropIndicator } from './TableDropIndicator';
import { TableEditableCell } from './TableEditableCell';
import { TableExpandableRows } from './TableExpandableRows';
import { TableFooter } from './TableFooter';
import {
  TableHeader,
  type TableHeaderProps,
  injectedColumnKeys,
} from './TableHeader';
import { TableRow } from './TableRow';

type RemovedProps = 'className' | 'style' | 'selectionBehavior' | 'render';

export interface TableProps extends Omit<RAC.TableProps, RemovedProps> {
  /**
   * Visual variant of the component. Which values exist is defined by the theme
   * and listed in the "Appearance" section of the component's documentation.
   */
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  /**
   * Size of the component. Which values exist is defined by the theme and listed
   * in the "Appearance" section of the component's documentation.
   */
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
   * Which level of rows can be selected. Rows outside it show no checkbox and
   * are left out of select-all and range selection. Use `disabledKeys` for
   * rows that are selectable in principle but not right now. After select-all,
   * `onSelectionChange` receives `'all'`, which then means every row on the
   * selectable level, not every key. Once a row is deselected after that, the
   * selection lists only rendered rows, so the children of a collapsed group
   * drop out of it.
   * @default 'all'
   */
  selectableRows?: 'all' | 'top-level' | 'nested';
  /**
   * How far nested rows indent in the `treeColumn`. `aligned` lines the first
   * nested level up with its group's label, and deeper levels indent from
   * there. Use it when every top-level row is a group, otherwise a top-level
   * row without children reads as the previous group's last child.
   * @default 'default'
   */
  treeIndent?: 'default' | 'aligned';
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
/**
 * The header's static columns, for the first render. The collection that
 * `TableElement` reads them from doesn't exist yet, and on the server it never
 * reaches a layout effect, so skeleton rows would be missing from the HTML.
 */
// Fragments are transparent to React Aria's collection, so flatten them too.
const flattenChildren = (children: ReactNode): ReactNode[] =>
  Children.toArray(children).flatMap(child =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? flattenChildren(child.props.children)
      : [child]
  );

const findChild = <P,>(children: ReactNode, type: unknown) =>
  flattenChildren(children).find(
    (child): child is ReactElement<P> =>
      isValidElement(child) && child.type === type
  );

const skeletonColumnsFromChildren = (children: ReactNode): SkeletonColumn[] => {
  const header = findChild<TableHeaderProps>(children, TableHeader);
  // Columns from a `columns` render function are only known to the collection.
  if (!header || typeof header.props.children === 'function') return [];

  const columns = flattenChildren(header.props.children);
  // A wrapper component hides its columns, so a count would come up short.
  // Wait for the collection instead of rendering rows with missing cells.
  if (
    !columns.every(child => isValidElement(child) && child.type === TableColumn)
  )
    return [];

  return columns.flatMap((child, index) =>
    isValidElement<TableColumnProps>(child)
      ? [
          {
            key: child.props.id ?? `marigold-skeleton-column-${index}`,
            alignX: child.props.alignX,
            skeleton: child.props.skeleton,
          },
        ]
      : []
  );
};

/** Whether the body starts out with skeleton rows, for the first render. */
const startsWithSkeletons = (children: ReactNode) => {
  const body = findChild<TableBodyProps>(children, TableBody);
  return !!body?.props.skeletonRows && isEmptyBody(body.props);
};

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
    // The bar may have closed, or the table unmounted, within the frame.
    if (!row.isConnected || !bar.isConnected) return;

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
  /** Receives the columns as JSON, so an unchanged value skips the re-render. */
  onSkeletonColumnsChange: (columnsKey: string) => void;
  onShowsSkeletonsChange: (shows: boolean) => void;
}

/**
 * The `<table>` is the one Marigold element React Aria renders inside its own
 * providers, so it is where the column layout can be read.
 */
const TableElement = ({
  loading,
  onMinWidthChange,
  onSkeletonColumnsChange,
  onShowsSkeletonsChange,
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

  // Only the first consumer column sticks to the start, taking the injected
  // drag and selection columns with it, and only the last sticks to the end.
  const columns = state?.collection.columns ?? [];
  const injected = columns.filter(column =>
    injectedColumnKeys.has(column.key)
  ).length;

  // Skeleton rows need the consumer's columns, which the collection has. A
  // string bails out of the state update when nothing changed, and only a
  // loading table reports, so other tables never re-render for it.
  // An empty collection reports nothing, so the header's columns stay in use.
  const skeletonColumnsKey =
    loading && columns.length > injected
      ? JSON.stringify(
          columns
            .filter(column => !injectedColumnKeys.has(column.key))
            .map(column => ({ key: column.key, alignX: column.props.alignX }))
        )
      : undefined;
  useLayoutEffect(() => {
    if (skeletonColumnsKey) onSkeletonColumnsChange(skeletonColumnsKey);
  }, [skeletonColumnsKey, onSkeletonColumnsChange]);

  const rows = state?.collection.rows ?? [];
  const showsSkeletons =
    rows.length > 0 && rows.every(row => isSkeletonRowKey(row.key));
  useLayoutEffect(() => {
    onShowsSkeletonsChange(showsSkeletons);
  }, [showsSkeletons, onShowsSkeletonsChange]);

  const first = columns.at(injected);
  const last = columns.at(-1);
  const edges = columns.map((column, index): StickyEdge | undefined =>
    index <= injected && first?.props.sticky === 'start'
      ? 'start'
      : column === last && column.props.sticky === 'end'
        ? 'end'
        : undefined
  );

  // Keyed on the edges alone, so cells re-render only when those change.
  const edgesKey = edges.join();
  const stickyColumns = useMemo(
    () =>
      /\w/.test(edgesKey)
        ? edgesKey
            .split(',')
            .map(edge =>
              edge === 'start' || edge === 'end' ? edge : undefined
            )
        : noStickyColumns,
    [edgesKey]
  );

  const widthAt = (edge: StickyEdge) =>
    columns.reduce<number>(
      (sum, column, index) =>
        edges[index] === edge
          ? sum + (layout?.getColumnWidth(column.key) ?? 0)
          : sum,
      0
    );
  const stickyStart = widthAt('start');
  const stickyEnd = widthAt('end');

  // Named by position: the label is a render function by now.
  const ignored = columns.flatMap((column, index) =>
    column.props.sticky && !edges[index]
      ? [`column ${index - injected + 1}`]
      : []
  );

  useDevWarning(
    ignored.length > 0,
    ignored.length > 0
      ? `[Table] \`sticky="start"\` only applies to the first column and \`sticky="end"\` to the last. It is ignored on: ${ignored.join(', ')}.`
      : ''
  );

  return (
    <TableStickyContext value={stickyColumns}>
      <table
        {...props}
        style={{
          ...props.style,
          // Read by the cells that scroll, to keep focus clear of the sticky ones.
          ...((stickyStart > 0 || stickyEnd > 0) && {
            '--table-sticky-start': `${stickyStart}px`,
            '--table-sticky-end': `${stickyEnd}px`,
          }),
        }}
        aria-busy={loading || undefined}
      />
    </TableStickyContext>
  );
};

const TableRoot = ({
  variant,
  size,
  overflow = 'wrap',
  allowTextSelection = false,
  alignY = 'middle',
  loading = false,
  actionBar,
  treeColumn,
  selectableRows = 'all',
  treeIndent = 'default',
  selectedKeys: selectedKeysProp,
  defaultSelectedKeys: defaultSelectedKeysProp,
  onSelectionChange: onSelectionChangeProp,
  disabledBehavior,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  const [measuredColumnsKey, setMeasuredColumnsKey] = useState<string>();
  // Read once: only the first render, on the server too, lacks the collection.
  const [headerSkeletonColumns] = useState(() =>
    loading ? skeletonColumnsFromChildren(props.children) : []
  );
  const skeletonColumns = useMemo(
    (): readonly SkeletonColumn[] =>
      measuredColumnsKey
        ? JSON.parse(measuredColumnsKey)
        : headerSkeletonColumns,
    [measuredColumnsKey, headerSkeletonColumns]
  );
  // Measured once the collection exists. The first render, on the server too,
  // reads it from the body, so "select all" starts out disabled.
  const [showsSkeletons, setShowsSkeletons] = useState(
    () => loading && startsWithSkeletons(props.children)
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || minTableWidth === undefined) return;

    // Only a `Scrollable` is left alone: it scrolls sideways and has a height
    // of its own for a sticky header to pin to. Reading `overflow-x` instead
    // would catch every vertical scroller too, because CSS computes it to
    // `auto` whenever `overflow-y` is not `visible`, and a `Dialog` or a
    // scrolling app shell would keep the overflow this guard exists to stop.
    // Only the nearest scroll parent is asked, so a vertical-only scroller
    // between the table and a `Scrollable` hides it and the table takes the
    // overflow itself. Contained either way, just not by the `Scrollable`.
    if (getScrollParent(container).hasAttribute('data-scrollable')) {
      setScrolls(false);
      return;
    }

    setScrolls(container.getBoundingClientRect().width < minTableWidth);
  }, [minTableWidth]);

  // Without a tree every row is top-level, so "nested" would leave nothing
  // selectable. Not a type error: the two props are often set at different times.
  useDevWarning(
    selectableRows === 'nested' && treeColumn == null,
    '[Table] `selectableRows="nested"` without a `treeColumn` leaves no row selectable, because every row is top-level. Set `treeColumn`, or use `selectableRows="all"`.'
  );

  useResizeObserver({ ref: containerRef, onResize: measure });
  useLayoutEffect(measure, [measure]);

  // Only rows outside the selectable level read `disabledKeys`. An inline array
  // is a new reference on every render, so keeping it out of the context
  // otherwise spares every row and cell a re-render.
  const rowDisabledKeys =
    selectableRows === 'all' ? undefined : props.disabledKeys;

  const ctx = useMemo(
    () => ({
      classNames,
      variant,
      size,
      overflow,
      allowTextSelection,
      alignY,
      treeColumn,
      selectableRows,
      disabledKeys: rowDisabledKeys,
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
      selectableRows,
      rowDisabledKeys,
      warnedMissingTextValue,
    ]
  );

  const skeletonCtx = useMemo(
    () => ({ loading, skeletonColumns, showsSkeletons }),
    [loading, skeletonColumns, showsSkeletons]
  );

  const { selectedKeys, onSelectionChange, actionBarHeight, actionBarOverlay } =
    useActionBar({
      selectedKeys: selectedKeysProp as Selection | undefined,
      defaultSelectedKeys: defaultSelectedKeysProp as Selection | undefined,
      onSelectionChange: onSelectionChangeProp,
      actionBar,
    });

  // The table is always controlled here, so dropping a change keeps it out.
  // Covers select-all by keyboard, which the disabled checkbox doesn't, and
  // also keeps Escape from clearing a selection until the data has arrived.
  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      if (!showsSkeletons) onSelectionChange(keys);
    },
    [showsSkeletons, onSelectionChange]
  );

  // A live region rendered with the table would be inserted with its text
  // already in it on mount, which screen readers skip. The shared announcer's
  // region exists ahead of time, so the first load is announced too.
  useEffect(() => {
    if (!loading) return;
    announce(stringFormatter.format('loadingMessage'), 'polite');
  }, [loading, stringFormatter]);

  return (
    <TableContext value={ctx}>
      <TableSkeletonContext value={skeletonCtx}>
        <div
          ref={containerRef}
          data-scrolls={scrolls || undefined}
          // Keeps the container filling its parent when the parent doesn't stretch.
          className={cn(
            'w-full',
            // `overflow-x-auto` is the fallback that keeps the table scrolling for
            // a theme that leaves `container` undefined. theme-rui's part sets it
            // too, so don't "clean up" the duplicate.
            scrolls && ['overflow-x-auto', classNames.container]
          )}
          onFocus={
            actionBarHeight ? scrollFocusedRowClearOfActionBar : undefined
          }
        >
          <ResizableTableContainer
            // Containment keeps the measured width from following the table (DST-1836).
            className="w-full [contain:inline-size]"
            style={{ minWidth: minTableWidth }}
          >
            <RACTable
              // Its own stacking context, so the sticky header, footer and
              // columns order among themselves and never against the page.
              className={cn('group/table isolate', classNames.table)}
              treeColumn={treeColumn}
              selectionBehavior="toggle"
              selectedKeys={selectedKeys}
              defaultSelectedKeys={
                actionBar ? undefined : defaultSelectedKeysProp
              }
              onSelectionChange={handleSelectionChange}
              // With "selection" a disabled row stays focusable and actionable,
              // and a row can't opt back out, so skeleton rows need "all".
              disabledBehavior={showsSkeletons ? 'all' : disabledBehavior}
              render={domProps => (
                <TableElement
                  // Only a virtualized table renders a `<div>`, and Marigold's never is.
                  {...(domProps as ComponentProps<'table'>)}
                  // The theme owns the indent, so it only learns which one applies.
                  data-tree-indent={
                    treeIndent === 'default' ? undefined : treeIndent
                  }
                  loading={loading}
                  onMinWidthChange={setMinTableWidth}
                  onSkeletonColumnsChange={setMeasuredColumnsKey}
                  onShowsSkeletonsChange={setShowsSkeletons}
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
                    height: actionBarHeight
                      ? 'var(--actionbar-offset, 8px)'
                      : 0,
                  }}
                />
                {actionBarOverlay}
                {/* Cancels the bar's own height, then slides open to it, so the
                  content below moves smoothly instead of jumping. */}
                <div
                  aria-hidden
                  className={classNames.actionBarSpacer}
                  style={{
                    marginTop: -actionBarHeight,
                    height: actionBarHeight,
                  }}
                />
              </>
            )}
          </ResizableTableContainer>
        </div>
      </TableSkeletonContext>
    </TableContext>
  );
};

const Table = Object.assign(TableRoot, {
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
