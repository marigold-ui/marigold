import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Global,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
} from '@marigold/system';

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
          <Global />
          {children}
        </OverlayProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
