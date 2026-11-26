import { createContext, use } from 'react';
import type RAC from 'react-aria-components';
import type { ComponentClassNames } from '@marigold/system';
import type { textAlign } from '../utils/styleProps';

export interface TableContextProps {
  classNames: ComponentClassNames<'Table'>;
  variant?: string;
  size?: string;
  overflow?: 'truncate' | 'wrap';
  allowTextSelection?: boolean;
  alignY?: 'top' | 'middle' | 'bottom' | 'baseline';
  /**
   * Which column carries the hierarchy. Cells learn this from React Aria's
   * render props, but the header column has to compare its own `id`.
   */
  treeColumn?: RAC.TableProps['treeColumn'];
  /** Which level of rows carries selection. */
  selectableRows?: 'all' | 'top-level' | 'nested';
  /**
   * The table's own `disabledKeys`, so a row outside the selectable level can
   * tell whether the consumer disabled it as well.
   */
  disabledKeys?: RAC.TableProps['disabledKeys'];
  /** Components that already logged the missing `textValue` warning in this table. */
  warnedMissingTextValue: Set<string>;
}

/**
 * Kept apart from `TableContext`, so a `loading` toggle re-renders only the
 * header and body that read it, not every row and cell.
 */
export interface TableSkeletonContextProps {
  /** Whether the table's data is loading. */
  loading: boolean;
  /** The consumer's columns, for skeleton rows. */
  skeletonColumns: readonly SkeletonColumn[];
  /** Whether the body shows skeleton rows and nothing else. */
  showsSkeletons: boolean;
}

export interface SkeletonColumn {
  key: RAC.Key;
  alignX?: keyof typeof textAlign;
}

/** Lines of text per consumer column, measured from the last real rows. */
export const TableSkeletonLinesContext = createContext<
  ReadonlyMap<RAC.Key, number>
>(new Map());

const skeletonPrefix = 'marigold-skeleton-row-';
export const skeletonRowKey = (index: number) => `${skeletonPrefix}${index}`;
export const isSkeletonRowKey = (key: RAC.Key) =>
  typeof key === 'string' && key.startsWith(skeletonPrefix);

export const TableContext = createContext<TableContextProps | null>(null);

export const TableSkeletonContext =
  createContext<TableSkeletonContextProps | null>(null);

/**
 * The level of the rows rendered below this point, starting at 1 like React
 * Aria's. Needed while the collection is built, before React Aria knows it.
 */
export const TableRowLevelContext = createContext(1);

export type StickyEdge = 'start' | 'end';

/** Shared, so tables without sticky columns keep one stable value. */
export const noStickyColumns: readonly (StickyEdge | undefined)[] = [];

/**
 * The edge each column sticks to, by column index. Provided from inside React
 * Aria's table, where the column layout exists, so only rendered cells can
 * read it.
 */
export const TableStickyContext = createContext<
  readonly (StickyEdge | undefined)[] | null
>(null);

export const useTableContext = () => {
  const context = use(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a <Table> component');
  }
  return context;
};

export const useTableSkeletonContext = () => {
  const context = use(TableSkeletonContext);
  if (context === null) {
    throw new Error(
      'useTableSkeletonContext must be used within a <Table> component'
    );
  }
  return context;
};

export const useTableStickyContext = () => {
  const context = use(TableStickyContext);
  if (context === null) {
    throw new Error(
      'useTableStickyContext must be used within a <Table> component'
    );
  }
  return context;
};
