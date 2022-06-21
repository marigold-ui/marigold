import React, { createContext, useCallback, useContext } from 'react';
import {
  css as transformStyleObject,
  get as getfromTheme,
} from '@theme-ui/css';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
/**
 * @internal
 */
export const __defaultTheme = {};
const InternalContext = createContext(__defaultTheme);
export const useTheme = () => {
  const theme = useContext(InternalContext);
  /**
   * We cast the theme here to `any` since our subset is not
   * compatible with the typings of `theme-ui`. They support
   * arrays as scale values, we don't.
   */
  const css = useCallback(style => transformStyleObject(style)(theme), [theme]);
  /**
   * Get value from theme by pasing a path (e.g. "colors.primary").
   */
  const get = useCallback(path => getfromTheme(theme, path), [theme]);
  return { theme, css, get };
};
export function ThemeProvider({ theme, children }) {
  return React.createElement(
    EmotionProvider,
    { theme: theme },
    React.createElement(InternalContext.Provider, { value: theme }, children)
  );
}
//# sourceMappingURL=useTheme.js.map
