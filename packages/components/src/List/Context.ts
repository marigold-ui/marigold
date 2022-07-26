import { createContext, useContext } from 'react';
import { CSSObject } from '@marigold/system';

export interface ListContextProps {
  styles: CSSObject;
}

export const ListContext = createContext<ListContextProps>({} as any);
export const useListContext = () => useContext(ListContext);
