import { createContext, useContext } from 'react';
import { TableState } from '@react-stately/table';

export interface TableContextProps {
  state: TableState<object>;
  interactive: boolean;
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

export const TableContext = createContext<TableContextProps>({} as any);
export const useTableContext = () => useContext(TableContext);
