import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface ListBoxContextProps {
  classNames: ComponentClassNames<'ListBox'>;
  virtualized?: boolean;
}

export const ListBoxContext = createContext<ListBoxContextProps>({
  classNames: {} as ComponentClassNames<'ListBox'>,
});
export const useListBoxContext = () => useContext(ListBoxContext);
