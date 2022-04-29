import { createContext, useContext } from 'react';
import { ComponentStyleParts } from '@marigold/system';

export interface ListBoxContextProps {
  styles: ComponentStyleParts<
    ['container', 'list', 'option', 'section', 'sectionTitle']
  >;
}

export const ListBoxContext = createContext<ListBoxContextProps>({} as any);
export const useListBoxContext = () => useContext(ListBoxContext);
