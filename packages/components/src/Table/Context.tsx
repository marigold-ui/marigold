import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface TableContextProps {
  classNames: ComponentClassNames<'Table'>;
  variant?: string;
  size?: string;
  overflow?: 'truncate' | 'wrap';
  allowTextSelection?: boolean;
  alignY?: 'top' | 'middle' | 'bottom' | 'baseline';
}

export const TableContext = createContext<TableContextProps | null>(null);
export const useTableContext = () => {
  const context = use(TableContext);
  if (context === null) {
    throw new Error('useTableContext must be used within a <Table> component');
  }
  return context;
};
