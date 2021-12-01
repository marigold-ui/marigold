import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider, ThemeProviderProps, useTheme } from '@marigold/system';
import { GlobalStyles } from './GlobalStyles';

export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  /**
   * Check if isTopLevel to add OverlayProvider just once
   */
  const outerTheme = useTheme();
  const isTopLevel = outerTheme.theme !== theme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? (
        <OverlayProvider>
          <GlobalStyles />
          {children}
        </OverlayProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
