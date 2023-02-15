import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);

  return theme;
};

export interface ThemeProviderProps<T extends Theme> {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>) {
  return (
    <InternalContext.Provider value={theme}>
      {children}
    </InternalContext.Provider>
  );
}
