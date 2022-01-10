import { type Theme } from '@marigold/components';
import { colors } from './colors';
import { components } from './components';
import { typography } from './typography';

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
