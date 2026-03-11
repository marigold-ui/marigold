import { Theme, ThemeProvider, ThemeProviderProps } from '@marigold/system';
import { ConfirmationProvider } from '../Dialog/useConfirmation';

// Props (concrete type for docs; component remains generic)
// ---------------
export type MarigoldProviderProps = ThemeProviderProps<Theme>;

// Provider
// ---------------
export function MarigoldProvider<T extends Theme>({
  children,
  className,
  theme,
}: ThemeProviderProps<T>) {
  return (
    <ThemeProvider theme={theme} className={className}>
      <ConfirmationProvider>{children}</ConfirmationProvider>
    </ThemeProvider>
  );
}
