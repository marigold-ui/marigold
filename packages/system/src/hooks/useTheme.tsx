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
  /**
   * The theme that should be used within the provider context.
   */
  theme: T;
  /**
   * The children of the component.
   */
  children: ReactNode;
  /**
   * Additional class names to apply to the root element of the provider.
   */
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
