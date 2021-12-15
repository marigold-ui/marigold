import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Theme,
  Global,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
  __defaultTheme,
  CSSObject,
} from '@marigold/system';

// Theme Extension
// ---------------
export interface RootThemeExtension {
  root?: {
    body?: CSSObject;
    html?: CSSObject;
  };
}

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  theme,
  children,
}: MarigoldProviderProps<T>) {
  const outer = useTheme();
  const isTopLevel = outer.theme === __defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? (
        <>
          <Global />
          <OverlayProvider>{children}</OverlayProvider>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
