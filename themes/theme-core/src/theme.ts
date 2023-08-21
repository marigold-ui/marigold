import { Theme } from '@marigold/system';

import * as components from './components';
import { root } from './root';
import { screens } from './screens';
import { colors } from './tokens';

export const webFontUrl = [] as const;

export const theme: Theme = {
  name: 'core',
  screens,
  root,
  colors,
  components,
};
