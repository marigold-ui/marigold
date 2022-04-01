import { Theme } from '@marigold/components';

import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

export const theme: Theme = {
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
    text: colors.gray70,
    background: colors.orange00,
    primary: colors.orange60,
    secondary: colors.orange80,
    disabled: colors.gray40,
    error: colors.red60,
    warning: colors.orange40,
    info: colors.blue60,
    success: colors.green60,
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
  },
  root: {
    body: {
      m: 'small',
      p: 'none',
      fontFamily: 'body',
    },
  },
  borders: {
    none: 0,
    solid: `1px solid`,
    grey: `1px solid ${colors.gray60}`,
  },
  ...typography,
  ...components,
} as const;
