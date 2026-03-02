import { createContext, useContext } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export const TabContext = createContext<{
  classNames: ComponentClassNames<'Tabs'>;
}>({
  classNames: {} as ComponentClassNames<'Tabs'>,
});
export const useTabContext = () => useContext(TabContext);
