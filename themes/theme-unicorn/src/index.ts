import { type Theme } from '@marigold/components';
import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

export const webFontUrl = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
] as const;

const theme: Theme = {
  space: {
    none: 0,
    xxsmall: 3,
    xsmall: 12,
    small: 18,
    medium: 24,
    large: 34,
    xlarge: 42,
    xxlarge: 64,
  },
  sizes: {
    none: 0,
    xxsmall: 16,
    xsmall: 32,
    small: 40,
    medium: 80,
    large: 120,
    xlarge: 160,
    xxlarge: 240,
    huge: 320,
    epic: 480,
  },
  colors: {
    ...colors,
    text: colors.gray90,
    background: colors.gray00,
    primary: '#673ab7',
    secondary: '#9575cd',
    disabled: '#e9e7eb',
    error: '#ffb2b1',
    warning: '#fff3ad',
    info: '#a2edff',
    success: '#bcffbc',
  },
  root: {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'body',
    },
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  ...typography,
  ...components,
} as const;

export default theme;
