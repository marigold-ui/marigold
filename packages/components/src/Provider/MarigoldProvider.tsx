import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  GlobalStyles,
  ThemeProvider,
  ThemeProviderProps,
} from '@marigold/system';

// a merge of the ThemeProvider and the react-aria OverlayProvider
export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        <GlobalStyles />
        {children}
      </OverlayProvider>
    </ThemeProvider>
  );
};
