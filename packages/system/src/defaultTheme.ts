import { Theme } from './types/theme';

export const defaultTheme = {
  name: 'default',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  components: {},
} satisfies Theme;
