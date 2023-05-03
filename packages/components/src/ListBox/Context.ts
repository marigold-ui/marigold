import { createContext, useContext } from 'react';

// TVSlots or SlotsClassValue oder ClassValue or any????
export interface ListBoxContextProps {
  classNames: any;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
