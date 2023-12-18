import { createContext, useContext } from 'react';

export interface ListBoxContextProps {
  classNames: any;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
