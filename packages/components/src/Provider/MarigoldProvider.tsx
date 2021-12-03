import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
  __defaultTheme,
} from '@marigold/system';
import { GlobalStyles } from './GlobalStyles';

export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const outer = useTheme();
  const isTopLevel = outer.theme === __defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? (
        <>
          <GlobalStyles />
          <OverlayProvider>{children}</OverlayProvider>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
