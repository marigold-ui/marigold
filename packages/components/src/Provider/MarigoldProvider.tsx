import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '@marigold/system';
import { Global, jsx } from '@emotion/react';
import { css, Theme } from '@theme-ui/css';

const GlobalStyles = () =>
  jsx(Global, {
    styles: emotionTheme => {
      const theme = emotionTheme as Theme;
      const { useRootStyles } = theme.config || theme;

      if (useRootStyles === false || (theme.styles && !theme.styles.root)) {
        return null;
      }

      return css({
        html: {
          variant: 'root',
        },
        body: {
          margin: 0,
        },
      })(theme);
    },
  });

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
