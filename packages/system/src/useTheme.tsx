import React, { createContext, useContext } from 'react';

const Context = createContext({});

export const useTheme = () => useContext(Context);

export type ThemeProviderProps = { theme: any };
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => <Context.Provider value={theme}>{children}</Context.Provider>;
