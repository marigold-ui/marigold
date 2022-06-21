import { ReactNode } from 'react';
import { StyleObject, Theme } from '../types';
/**
 * @internal
 */
export declare const __defaultTheme: Theme;
export declare const useTheme: () => {
  theme: Theme;
  css: (style: StyleObject) => import('@theme-ui/css').CSSObject;
  get: (path: string) => any;
};
export interface ThemeProviderProps<T extends Theme> {
  theme: T;
  children: ReactNode;
}
export declare function ThemeProvider<T extends Theme>({
  theme,
  children,
}: ThemeProviderProps<T>): JSX.Element;
//# sourceMappingURL=useTheme.d.ts.map
