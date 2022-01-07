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
    text: colors.gray90,
    background: colors.gray30,
    primary: colors.brand.red,
    secondary: colors.brand.orange,
    disabled: colors.gray40,
    error: colors.red60,
    warning: colors.orange60,
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
      margin: 8,
      padding: 0,
      fontFamily: 'body',
    },
  },
  borders: {
    none: 0,
    grey: `1px solid ${colors.gray60}`,
  },
  ...typography,
  ...components,
} as const;
