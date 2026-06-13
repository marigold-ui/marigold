import type { ReactNode } from 'react';
import type { Theme } from '../types/theme';
import { ThemeProvider } from './useTheme';

export const testTheme: Theme = {
  name: 'test',
  screens: {
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
  },
  components: {},
};

export const themeWrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);
