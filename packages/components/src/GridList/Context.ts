import { createContext, useContext } from 'react';

export interface GridListContextProps {
  classNames: any;
}

export const GridListContext = createContext<GridListContextProps>({} as any);
export const useGridListContext = () => useContext(GridListContext);
