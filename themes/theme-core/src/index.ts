import { type Theme } from '@marigold/components';
import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

const theme: Theme = {
  space: {
    none: 0,
    xxsmall: 4,
    xsmall: 8,
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 40,
    xxlarge: 48,
  },
  colors: {
    ...colors,
    text: '#511e04',
    background: colors.gray10,
    primary: colors.orange60,
    secondary: colors.gray70,
    disabled: colors.gray40,
    error: '#f33',
    warning: '#d80',
    info: '#008',
    success: '#080',
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
    xlarge: 10,
  },
  ...typography,
  ...components,
} as const;

export default theme;
