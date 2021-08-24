import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
} from '@marigold/system';

export interface ThemeContextValue {
  theme: Theme;
}

export const defaultThemeValue: ThemeContextValue = {
  theme: {},
};

// a merge of the ThemeProvider and the react-aria OverlayProvider
export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const outerTheme = useTheme();
  const outerThemeJson = JSON.stringify(outerTheme, null, 2);
  const defaultThemeValueJson = JSON.stringify(defaultThemeValue, null, 2);
  const isTopLevel = outerThemeJson === defaultThemeValueJson;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? <OverlayProvider>{children}</OverlayProvider> : children}
    </ThemeProvider>
  );
};
