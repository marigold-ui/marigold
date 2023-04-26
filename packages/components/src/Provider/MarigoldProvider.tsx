import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  __defaultTheme,
  useTheme,
} from '@marigold/system';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {
  className?: string;
}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  theme,
}: MarigoldProviderProps<T>) {
  const outerTheme = useTheme();
  const isTopLevel = outerTheme.name === __defaultTheme.name;
  //const isTopLevel = outerTheme === __defaultTheme;

  console.log(outerTheme.name, isTopLevel);

  if (outerTheme.name && !isTopLevel) {
    throw new Error(
      `[MarigoldProvider] You cannot nest a MarigoldProvider inside another MarigoldProvider without a "selector"!
      Nested themes with a "root" property must specify a "selector" to prevent accidentally overriding global CSS`
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? <OverlayProvider>{children}</OverlayProvider> : children}
    </ThemeProvider>
  );
}
