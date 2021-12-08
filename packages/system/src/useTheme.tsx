import React, { createContext, useCallback, useContext } from 'react';
import { css as transformStyleObject } from '@theme-ui/css';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

import { StyleObject, Theme } from './types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);
  const css = useCallback(
    (style: StyleObject) => transformStyleObject(style)(theme),
    [theme]
  );
  return { theme, css };
};

export type ThemeProviderProps = { theme: any };
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => (
  <EmotionProvider theme={theme}>
    <InternalContext.Provider value={theme}>
      {children}
    </InternalContext.Provider>
  </EmotionProvider>
);
