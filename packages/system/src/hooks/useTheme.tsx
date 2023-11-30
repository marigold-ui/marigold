import React, { ReactNode, createContext, useContext } from 'react';

import { defaultTheme } from '../defaultTheme';
import { Theme } from '../types';

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
    <div>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </div>
  );
}
