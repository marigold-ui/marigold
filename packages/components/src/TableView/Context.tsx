import { createContext, useContext } from 'react';

export interface TableViewContextProps {
  classNames?: {
    table?: string;
    thead?: string;
    headerRow?: string;
    header?: string;
    body?: string;
    row?: string;
    cell?: string;
  };
  variant?: string;
  size?: string;
}

export const TableViewContext = createContext<TableViewContextProps>({} as any);
export const useTableViewContext = () => useContext(TableViewContext);
