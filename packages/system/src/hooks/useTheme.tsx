import React, { createContext, ReactNode, useContext } from 'react';
import { Theme } from '../types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {
  name: 'default',
  components: {},
};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);

  return theme;
};

export interface ThemeProviderProps<T extends Theme> {
  theme: T;
  children: ReactNode;
  selector?: string;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>) {
  return (
    <div data-theme={theme.name} className={theme?.root ? theme.root() : ''}>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </div>
  );
}
