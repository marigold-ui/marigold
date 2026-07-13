import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export interface ListViewContextProps {
  classNames: ComponentClassNames<'ListView'>;
}

export const ListViewContext = createContext<ListViewContextProps>({
  classNames: {} as ComponentClassNames<'ListView'>,
});
export const useListViewContext = () => use(ListViewContext);
