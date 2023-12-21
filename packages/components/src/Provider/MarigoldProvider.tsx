import { OverlayProvider } from '@react-aria/overlays';

import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  defaultTheme,
  useTheme,
} from '@marigold/system';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {
  className?: string;
}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  theme,
  className,
}: MarigoldProviderProps<T>) {
  const outerTheme = useTheme();
  const isTopLevel = outerTheme === defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? <OverlayProvider>{children}</OverlayProvider> : children}
    </ThemeProvider>
  );
}
