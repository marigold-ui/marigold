import { Theme } from '@marigold/system';
import { flattenObject } from '@marigold/theme-preset';
import * as components from './components';
import { root } from './root';
import { screens } from './screens';
import { colors, height, shadow } from './tokens';

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
] as const;

export const theme: Theme = {
  name: 'b2b',
  screens,
  root,
  colors,
  shadow: flattenObject(shadow),
  height: flattenObject(height),
  components,
};
