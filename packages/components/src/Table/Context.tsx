import { createContext, useContext } from 'react';
import { TableState } from '@react-stately/table';

export interface TableContextProps {
  state: TableState<object>;
  interactive: boolean;
  // how to type I thought of TVReturnType but no ? :/
  classNames?: any;
  variant?: string;
  size?: string;
}

export const TableContext = createContext<TableContextProps>({} as any);
export const useTableContext = () => useContext(TableContext);
