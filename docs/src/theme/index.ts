import { Theme } from '@marigold/components';

import { root } from './root';
import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

export const theme: Theme = {
  root,
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
    text: colors.black,
    background: colors.gray[80],
    primary: colors.brand.red,
    secondary: colors.brand.orange,
    disabled: colors.gray[70],
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue,
    success: colors.green,
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
  },
  borders: {
    none: 0,
    grey: `1px solid ${colors.gray[60]}`,
  },
  ...typography,
  ...components,
} as const;
