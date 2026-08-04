import { createContext, use } from 'react';
import type { ComponentClassNames } from '@marigold/system';

export const TabContext = createContext<{
  classNames: ComponentClassNames<'Tabs'>;
}>({ classNames: {} as ComponentClassNames<'Tabs'> });
export const useTabContext = () => use(TabContext);
