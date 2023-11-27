import { createContext, useContext } from 'react';

export const TabContext = createContext<{
  classNames: {
    container: string;
    tabsList: string;
    tab: string;
    tabpanel: string;
  };
}>({} as any);
export const useTabContext = () => useContext(TabContext);
