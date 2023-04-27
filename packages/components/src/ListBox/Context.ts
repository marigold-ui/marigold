import { createContext, useContext } from 'react';
import { ClassValue } from 'tailwind-variants';

// TVSlots or SlotsClassValue oder ClassValue ????
export interface ListBoxContextProps {
  classNames: Record<string, ClassValue>;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
