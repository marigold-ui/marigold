import { createContext, use } from 'react';
import type RAC from 'react-aria-components';
import type { ComponentClassNames } from '@marigold/system';

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
  /** Components that already logged the missing `textValue` warning in this table. */
  warnedMissingTextValue: Set<string>;
}

export const TableContext = createContext<TableContextProps | null>(null);

export type StickyEdge = 'start' | 'end';

/** Shared, so tables without sticky columns keep one stable value. */
export const noStickyColumns: readonly (StickyEdge | undefined)[] = [];

/**
 * The edge each column sticks to, by column index. Provided from inside React
 * Aria's table, where the column layout exists, so only rendered cells can
 * read it.
 */
export const TableStickyContext = createContext(noStickyColumns);
export const useTableContext = () => {
  const context = use(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a <Table> component');
  }
  return context;
};
