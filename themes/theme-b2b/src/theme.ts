import { Theme } from '@marigold/system';
import * as components from './components';
import { root } from './root';

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
] as const;

export const theme: Theme = {
  name: 'b2b',
  root,
  components,
};
