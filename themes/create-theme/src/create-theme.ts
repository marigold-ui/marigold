import { ScaleValue, Theme } from '@marigold/system';

import * as Vars from './vars';

export const base: Theme = {
  breakpoints: ['40em', '52em', '64em'],

  fontWeights: Vars.typography.weight,
  lineHeights: Vars.typography.lineHeight,
  letterSpacings: Vars.typography.letterSpacing,

  borderWidths: Vars.border.width,
  radii: Vars.border.radius,

  zIndices: Vars.layer,
  opacities: Vars.opacity,
};

type AvailableColor = keyof typeof Vars.color;
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
}

/*#__PURE__*/
export const createTheme = ({
  colors: configColors = [],
  fonts: configFonts,
  typography = 'fixed',
  dimensions = 'fixed',
}: ThemeConfig): Theme => {
  // Create colors (pick from vars or custom)
  let colors: Theme['colors'] = {};
  for (let i = 0; i < configColors.length; i++) {
    const color = configColors[i];
    if (typeof color === 'string') {
      colors[color] = Vars.color[color];
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
    space: Vars.size[dimensions],
    sizes: Vars.size[dimensions],

    // Use fallback font if none provided
    fonts: configFonts || Vars.typography.font,

    // Use fixed or fluid typography
    fontSizes: Vars.typography.size[typography],
  };
};
