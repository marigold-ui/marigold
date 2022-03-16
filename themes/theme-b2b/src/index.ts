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
    text: colors.gray70,
    background: colors.gray10,
    primary: colors.orange60,
    secondary: colors.gray70,
    disabled: colors.gray40,
    error: colors.red60,
    warning: colors.orange60,
    info: colors.blue70,
    success: colors.green70,
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
