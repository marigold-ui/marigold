import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import {
  css as transformStyleObject,
  get as getfromTheme,
} from '@theme-ui/css';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

import { Theme } from './theme.types';
import { StyleObject } from './types/system';

/**
 * @internal
 */
export const __defaultTheme: Theme = {};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);
  /**
   * We cast the theme here to `any` since our subset is not
   * compatible with the typings of `theme-ui`. They support
   * arrays as scale values, we don't.
   */
  const css = useCallback(
    (style: StyleObject) => transformStyleObject(style)(theme as any),
    [theme]
  );
  /**
   * Get value from theme by pasing a path (e.g. "colors.primary").
   */
  const get = useCallback((path: string) => getfromTheme(theme, path), [theme]);
  return { theme, css, get };
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
    <EmotionProvider theme={theme}>
      <InternalContext.Provider value={theme}>
        {children}
      </InternalContext.Provider>
    </EmotionProvider>
  );
}
