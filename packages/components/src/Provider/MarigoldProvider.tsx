import { OverlayProvider } from '@react-aria/overlays';

import {
  Theme,
  ThemeProvider,
  ThemeProviderProps,
  defaultTheme,
  useTheme,
} from '@marigold/system';

import { OverlayContainerProvider } from './OverlayContainerProvider';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {
  portalContainer?: string;
}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  theme,
  portalContainer,
}: MarigoldProviderProps<T>) {
  const outerTheme = useTheme();
  const isTopLevel = outerTheme === defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      {isTopLevel ? (
        <OverlayContainerProvider value={portalContainer}>
          <OverlayProvider>{children}</OverlayProvider>
        </OverlayContainerProvider>
      ) : (
        children
      )}
    </ThemeProvider>
  );
}
