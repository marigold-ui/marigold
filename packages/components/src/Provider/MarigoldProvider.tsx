import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';

// Props
// ---------------
export interface MarigoldProviderProps<T extends Theme>
  extends ThemeProviderProps<T> {}

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  className,
  theme,
}: MarigoldProviderProps<T>) {
  return (
    <ThemeProvider theme={theme} className={className}>
      {children}
    </ThemeProvider>
  );
}
