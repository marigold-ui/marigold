import type { Theme } from '@marigold/system';
import * as components from './components';
import { root } from './root';
import { screens } from './screens';
import { colors } from './tokens';

export const theme: Theme = {
  name: 'docs',
  screens,
  root,
  colors,
  components,
};
export default theme;
