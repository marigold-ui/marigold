import React from 'react';
import { ThemeContext } from './emotion';

// TODO: change any to theme when theme component exists
export type MarigoldProviderProps<T extends any> = React.PropsWithChildren<{
  theme: T;
}>;

export const MarigoldProvider = <T extends any>({
  theme,
  children,
}: MarigoldProviderProps<T>) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
