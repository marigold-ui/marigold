import { createContext, useContext } from 'react';

export const DrawerContext = createContext<{
  variant?: string;
  size?: string;
}>({
  variant: undefined,
  size: undefined,
});
export const useDrawerContext = () => useContext(DrawerContext);
