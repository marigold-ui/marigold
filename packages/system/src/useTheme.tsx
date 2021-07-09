import React, { createContext, useCallback, useContext } from 'react';
import { css as themeUi } from '@theme-ui/css';
import { Theme } from '@marigold/system';

import { StyleObject } from './types';

const Context = createContext<Theme>({});

export const useTheme = () => {
  const theme = useContext(Context);
  const css = useCallback(
    (style: StyleObject) => themeUi(style)(theme),
    [theme]
  );
  return { theme, css };
};

export type ThemeProviderProps = { theme: any };
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => <Context.Provider value={theme}>{children}</Context.Provider>;
