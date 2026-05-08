import { createContext, useContext } from 'react';

export interface DrawerContextProps {
  variant?: string;
  size?: string;
}

export const DrawerContext = createContext<DrawerContextProps>({
  variant: undefined,
  size: undefined,
});

export const useDrawerContext = () => useContext(DrawerContext);
