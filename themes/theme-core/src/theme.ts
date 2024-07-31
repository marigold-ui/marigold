import { Theme } from '@marigold/system';
import { flattenObject } from '@marigold/theme-preset';

import * as components from './components';
import { root } from './root';
import { screens } from './screens';
import { colors, height, shadow } from './tokens';

export const webFontUrl = [] as const;

export const theme: Theme = {
  name: 'core',
  screens,
  root,
  colors,
  shadow: flattenObject(shadow),
  height: flattenObject(height),
  components,
};
