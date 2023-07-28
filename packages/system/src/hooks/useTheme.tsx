import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../types';
import { defaultTheme } from '../defaultTheme';

const InternalContext = createContext<Theme>(defaultTheme);

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
    <div data-theme={theme.name} className={theme.root?.() ?? ''}>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </div>
  );
}
