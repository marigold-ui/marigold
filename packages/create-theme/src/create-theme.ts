import type { ScaleValue, Theme as Scales } from '@marigold/system';
import type { Theme } from '@marigold/components';

import * as Token from '@marigold/tokens';

export const base: Theme = {
  breakpoints: ['40em', '52em', '64em'],

  fontWeights: Token.typography.weight,
  lineHeights: Token.typography.lineHeight,
  letterSpacings: Token.typography.letterSpacing,

  borderWidths: Token.border.width,
  radii: Token.border.radius,

  zIndices: Token.layer,
  opacities: Token.opacity,

  components: {},
};

type AvailableColor = keyof typeof Token.color;
type CustomColor = { name: string; value: ScaleValue<string> };

export interface ThemeConfig {
  /**
   * Used to pick from existing color palette or define custom colors.
   */
  colors?: (AvailableColor | CustomColor)[];

  /**
   * Used to define a the `font-family` scale.
   */
  fonts?: { [key: string]: string };

  /**
   * Used to define if fixed or fluid typography should be used.
   */
  typography?: 'fixed' | 'fluid';

  /**
   * Used to define if fluid or fixed sizes and whitespace should be used.
   */
  dimensions?: 'fixed' | 'fluid';

  components?: Omit<Theme, keyof Scales>;
}

/*#__PURE__*/
export const createTheme = ({
  colors: configColors = [],
  fonts: configFonts,
  typography = 'fixed',
  dimensions = 'fixed',
  components,
}: ThemeConfig): Theme => {
  // Create colors (pick from Token or custom)
  let colors: Theme['colors'] = {};
  for (let i = 0; i < configColors.length; i++) {
    const color = configColors[i];
    if (typeof color === 'string') {
      colors[color] = Token.color[color];
    } else {
      colors[color.name] = color.value;
    }
  }

  return {
    // Add base scales
    ...base,

    // Add selected colors
    colors,

    // Use fixed or fluid dimensions
    space: Token.space[dimensions],
    sizes: Token.size[dimensions],

    // Use fallback font if none provided
    fonts: configFonts || Token.typography.font,

    // Use fixed or fluid typography
    fontSizes: Token.typography.size[typography],

    // Add component styles
    ...components,
  };
};
