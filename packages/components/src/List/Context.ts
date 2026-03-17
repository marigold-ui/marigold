import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface ListContextProps {
  classNames: ComponentClassNames<'List'>;
}

export const ListContext = createContext<ListContextProps>({
  classNames: {} as ComponentClassNames<'List'>,
});
export const useListContext = () => useContext(ListContext);
