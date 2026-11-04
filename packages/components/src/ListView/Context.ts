import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export type ListViewItemClassNames = Pick<
  ComponentClassNames<'ListView'>,
  'item' | 'label' | 'description' | 'title' | 'indicator' | 'actions'
>;

export interface ListViewContextProps {
  classNames: ListViewItemClassNames;
}

export const ListViewContext = createContext<ListViewContextProps>({
  classNames: {} as ListViewItemClassNames,
});
export const useListViewContext = () => use(ListViewContext);
