import { Theme } from '@marigold/system';

import { colors } from './_tokens';
import * as components from './components';
import { root } from './root';
import { screens } from './screens';

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
] as const;

export const theme: Theme = {
  name: 'b2b',
  screens,
  root,
  colors,
  components,
};
