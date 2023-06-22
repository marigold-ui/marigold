import { Theme } from '@marigold/system';
import { colors } from './tokens';
import * as components from './components';

import { root } from './root';

export const theme: Theme = {
  name: 'core',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  root,
  colors: colors,
  components,
};
