import { Theme } from '@marigold/components';

// NEW STYLES!
import * as components from './components';

import { colors } from './colors';
import { component } from './component';

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
    large: 8,
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
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
    code: 'monospace',
  },
  fontSizes: {
    body: '1rem',
    xxxsmall: '0.75rem',
    xxsmall: '0.875rem',
    xsmall: '1rem',
    small: '1.125rem',
    medium: '1.25rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  fontWeights: {
    body: 400,
    heading: 900,
    medium: 600,
    bold: 700,
  },
  lineHeights: {
    xsmall: 1,
    small: 1.125,
    medium: 1.5,
    large: 2,
    xlarge: 2.5,
    xxlarge: 3,
  },
  ...component,

  components,
} as const;
