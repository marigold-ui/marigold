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
}

export const TableContext = createContext<TableContextProps | null>(null);
export const useTableContext = () => {
  const context = use(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a <Table> component');
  }
  return context;
};
