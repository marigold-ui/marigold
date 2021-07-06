import React, { createContext, useContext } from 'react';
import { Theme } from '@marigold/system';
import { get } from './get';

const Context = createContext<Theme>({});

export const useTheme = () => {
  const theme = useContext(Context);
  return { theme, get };
};

export type ThemeProviderProps = { theme: any };
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => <Context.Provider value={theme}>{children}</Context.Provider>;
