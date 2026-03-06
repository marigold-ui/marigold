import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export const TabContext = createContext<{
  classNames: ComponentClassNames<'Tabs'>;
  tabIndicatorLayoutId: string;
}>({
  classNames: {} as ComponentClassNames<'Tabs'>,
  tabIndicatorLayoutId: '',
});
export const useTabContext = () => useContext(TabContext);
