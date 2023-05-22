import { createContext, useContext } from 'react';

export interface ListContextProps {
  classNames: any;
}

export const ListContext = createContext<ListContextProps>({} as any);
export const useListContext = () => useContext(ListContext);
