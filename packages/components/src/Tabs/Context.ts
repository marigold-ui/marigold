import { createContext, useContext } from 'react';

export const TabContext = createContext<{
  classNames: { tabs: string; tab: string };
}>({} as any);
export const useTabContext = () => useContext(TabContext);
