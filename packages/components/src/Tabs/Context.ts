import { createContext, useContext } from 'react';

export const TabContext = createContext<{
  classNames: {
    container: string;
    tabs: string;
    tab: string;
    tabpanel: string;
  };
}>({} as any);
export const useTabContext = () => useContext(TabContext);
