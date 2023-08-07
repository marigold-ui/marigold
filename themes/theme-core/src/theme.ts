import { Theme } from '@marigold/system';

import { root } from './root';
import { screens } from './screens';
import { colors } from './tokens';

import * as components from './components';

export const theme: Theme = {
  name: 'core',
  screens,
  root,
  colors,
  components,
};
