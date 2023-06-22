import { createContext, useContext } from 'react';

export interface ListContextProps {
  classNames: string;
}

export const ListContext = createContext<ListContextProps>({} as any);
export const useListContext = () => useContext(ListContext);
