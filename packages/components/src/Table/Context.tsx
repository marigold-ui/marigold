import { createContext, useContext } from 'react';
import { TableState } from '@react-stately/table';
import { ComponentStyleParts } from '@marigold/system';

export interface TableContextProps {
  state: TableState<object>;
  interactive: boolean;
  styles: ComponentStyleParts<['table', 'header', 'row', 'cell']>;

  variant?: string;
  size?: string;
}

export const TableContext = createContext<TableContextProps>({} as any);
export const useTableContext = () => useContext(TableContext);
