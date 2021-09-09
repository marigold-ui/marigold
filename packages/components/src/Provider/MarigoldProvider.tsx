import React from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
} from '@marigold/system';


interface ThemeContextValue {
  theme: Theme;
}

const defaultThemeValue: ThemeContextValue = {
  theme: {},
};

/**
 * @internal
 */
const __MarigoldContext = React.createContext(
  defaultThemeValue
)

const useMarigoldTheme = () => React.useContext(__MarigoldContext)

// a merge of the ThemeProvider and the react-aria OverlayProvider
export const MarigoldProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const outerTheme = useMarigoldTheme();
  const isTopLevel = outerTheme === defaultThemeValue

  return (
    <ThemeProvider theme={theme}> 
      {isTopLevel ? <OverlayProvider>{children}</OverlayProvider> : children}
    </ThemeProvider>
  );
};
