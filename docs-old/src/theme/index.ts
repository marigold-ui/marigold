import { Theme as BaseTheme } from '@marigold/components';
import { border, shadow } from '@marigold/tokens';
import * as components from './components';
import { root } from './root';
import { colors } from './colors';
import { space } from './space';
import { sizes } from './sizes';
import * as typography from './typography';
import { ThemeExtensionsWithParts } from '@marigold/system';

export interface Theme extends BaseTheme {
  components: BaseTheme['components'] &
    ThemeExtensionsWithParts<
      'Navigation',
      ['container', 'category', 'item', 'list', 'group']
    >;
}

export const theme: Theme = {
  breakpoints: ['51em', '75em', '100em'],
  root,
  space,
  sizes,
  colors,
  radii: border.radius,
  borderWidths: border.width,
  shadows: shadow,
  components,
  ...typography,
};

export const webFontUrl = typography.webFontUrl;
