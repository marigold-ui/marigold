import { Theme } from '@marigold/system';

import { colors } from './_tokens';
import * as components from './components';
import { root } from './root';
import { screens } from './screens';

export const webFontUrl = [] as const;

export const theme: Theme = {
  name: 'core',
  screens,
  root,
  colors,
  components,
};
