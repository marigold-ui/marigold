import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';
import { ConfirmationProvider } from '../Dialog/useConfirmation';

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
      <ConfirmationProvider>{children}</ConfirmationProvider>
    </ThemeProvider>
  );
}
