import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { css as transformStyleObject } from '@theme-ui/css';
import { ThemeProvider as EmotionProvider } from '@emotion/react';

import { BaseTheme as Theme } from './theme';
import { StyleObject } from './types';

/**
 * @internal
 */
export const __defaultTheme: Theme = {};

const InternalContext = createContext<Theme>(__defaultTheme);

export const useTheme = () => {
  const theme = useContext(InternalContext);
  /**
   * We cast the theme here to `any` since our subset is not
   * compatible with the typings of `theme-ui`, since they
   * also support arrays as scale values, while we don't.
   */
  const css = useCallback(
    (style: StyleObject) => transformStyleObject(style)(theme as any),
    [theme]
  );
  return { theme, css };
};

export type ThemeProviderProps<T extends Theme> = {
  theme: T;
  children: ReactNode;
};

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
