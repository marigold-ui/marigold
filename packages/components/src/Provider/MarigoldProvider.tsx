import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  useTheme,
} from '@marigold/system';
import { Global } from '@emotion/react';

export interface ThemeContextValue {
  theme: Theme;
}

export const defaultThemeValue: ThemeContextValue = {
  theme: {},
};

const GlobalStyles = () => {
  const { css } = useTheme();
  const styles = css({
    body: { variant: 'root.body' },
    html: { variant: 'root.html' },
  });

  return <Global styles={styles} />;
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
      <OverlayProvider>
        <GlobalStyles />
        {children}
      </OverlayProvider>
    </ThemeProvider>
  );
};
