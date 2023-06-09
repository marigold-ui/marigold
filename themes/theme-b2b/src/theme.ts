import { Theme } from '@marigold/system';

import { root } from './root';
import { colors } from './tokens';

import * as components from './components';

export const theme: Theme = {
  name: 'b2b',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  root,
  colors,
  components,
};
