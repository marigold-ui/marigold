import { createContext, useContext } from 'react';
import { TVReturnType } from 'tailwind-variants';

// TVSlots or SlotsClassValue oder ClassValue ????
export interface ListBoxContextProps {
  classNames: TVReturnType<any, any, any, any, any, any>;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
