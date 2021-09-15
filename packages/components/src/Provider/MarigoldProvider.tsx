import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { ThemeProvider, ThemeProviderProps } from '@marigold/system';
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
  return (
    <ThemeProvider theme={theme}>
      <OverlayProvider>
        {/* <GlobalStyles /> */}
        {children}
      </OverlayProvider>
    </ThemeProvider>
  );
};
