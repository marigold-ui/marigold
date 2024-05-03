import React, { ReactNode, createContext, useContext } from 'react';

import { defaultTheme } from '../defaultTheme';
import { Theme } from '../types';
import { cn } from '../utils';

const InternalContext = createContext<Theme>(defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);

  return theme;
};

export interface ThemeProviderProps<T extends Theme> {
  theme: T;
  children: ReactNode;
  className?: string;
}

export function ThemeProvider<T extends Theme>({
  theme,
  children,
  className,
}: ThemeProviderProps<T>) {
  const root = theme.root?.();
  return (
    <InternalContext.Provider value={theme}>
      <div className={cn(root, className)}>{children}</div>
    </InternalContext.Provider>
  );
}
