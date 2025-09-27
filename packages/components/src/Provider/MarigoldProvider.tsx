import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';

// Props
// ---------------
export type MarigoldProviderProps<T extends Theme> = ThemeProviderProps<T>;

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
