import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider, ThemeProviderProps, useTheme } from '@marigold/system';
// import { Global } from '@emotion/react';
// import { css } from '@theme-ui/css';

// const GlobalStyles = () => {
//   const theme = useTheme();
//   const styles = css({
//     body: { variant: 'root.body' },
//     html: { variant: 'root.html' },
//   })(theme);

//   return <Global styles={styles} />;
// };
// a merge of the ThemeProvider and the react-aria OverlayProvider
export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const outerTheme = useTheme();
  const isTopLevel = outerTheme.theme !== theme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? (
        <OverlayProvider>
          {/* <GlobalStyles />  */}
          {children}
        </OverlayProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
};
