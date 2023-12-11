import { createContext, useContext } from 'react';

export interface TableContextProps {
  interactive?: boolean;
  classNames?: {
    table?: string;
    header?: string;
    row?: string;
    cell?: string;
  };
  variant?: string;
  size?: string;
}

export const TableContext = createContext<TableContextProps>({} as any);
export const useTableContext = () => useContext(TableContext);
