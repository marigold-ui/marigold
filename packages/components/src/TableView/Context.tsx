import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface TableViewContextProps {
  classNames: ComponentClassNames<'TableView'>;
  variant?: string;
  size?: string;
  overflow?: 'truncate' | 'wrap';
}

export const TableViewContext = createContext<TableViewContextProps | null>(
  null
);
export const useTableViewContext = () => {
  const context = useContext(TableViewContext);
  if (context === null) {
    throw new Error(
      'useTableViewContext must be used within a <TableView> component'
    );
  }
  return context;
};
