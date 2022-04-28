import { createContext, useContext } from 'react';
import { ComponentStyleParts } from '@marigold/system';

export interface ListBoxContextProps {
  styles: ComponentStyleParts<
    ['container', 'section', 'sectionTitle', 'option']
  >;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
