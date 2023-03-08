import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Global,
  GlobalProps,
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
  __defaultTheme,
} from '@marigold/system';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T>,
    GlobalProps {}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  theme,
  selector,
  normalizeDocument = true,
}: MarigoldProviderProps<T>) {
  const outer = useTheme();
  const isTopLevel = outer.theme === __defaultTheme;

  if (outer.theme?.root && !isTopLevel && !selector) {
    throw new Error(
      `[MarigoldProvider] You cannot nest a MarigoldProvider inside another MarigoldProvider without a "selector"! 
      Nested themes with a "root" property must specify a "selector" to prevent accidentally overriding global CSS`
    );
  }

  console.log('provider', theme);
  return (
    <ThemeProvider theme={theme}>
      <Global
        normalizeDocument={isTopLevel && normalizeDocument}
        selector={selector}
      />
      {isTopLevel ? <OverlayProvider>{children}</OverlayProvider> : children}
    </ThemeProvider>
  );
}
