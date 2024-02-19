import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  theme,
}: MarigoldProviderProps<T>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
