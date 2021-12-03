import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Global,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
  __defaultTheme,
} from '@marigold/system';

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
          <Global />
          <Global />
          <OverlayProvider>{children}</OverlayProvider>
        </>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
