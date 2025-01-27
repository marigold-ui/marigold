import { Theme } from '@marigold/system';
import * as components from './components';
import { root } from './root';

export const webFontUrl = [] as const;

export const theme: Theme = {
  name: 'core',
  root,
  components,
};
