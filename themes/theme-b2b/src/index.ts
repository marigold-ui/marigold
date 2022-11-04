import type { Theme } from '@marigold/components';

import { colors } from './colors';
import * as components from './components';
import {
  themeColors,
  primaryColors,
  secondaryColors,
  disabledColors,
  statusColors,
} from './semantic-colors';

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
] as const;

const theme: Theme = {
  breakpoints: ['40em', '52em', '64em'],
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
    ...themeColors,
    ...primaryColors,
    ...secondaryColors,
    ...disabledColors,
    ...statusColors,
  },
  root: {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'body',
      bg: 'gray00',
    },
  },
  radii: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
  },
  fontSizes: {
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
  components,
};

export default theme;
