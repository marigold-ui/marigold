import { Theme } from '@marigold/system';

import { border, layer, size, typography } from './vars';

export const base: Theme = {
  breakpoints: ['40em', '52em', '64em'],

  space: size.fixed,
  sizes: size.fixed,

  fontSizes: typography.size,
  fontWeights: typography.weight,
  lineHeights: typography.lineHeight,
  letterSpacings: typography.letterSpacing,

  borderWidths: border.width,
  radii: border.radius,

  zIndices: layer,
};

/*#__PURE__*/
export const createTheme = () => {
  // pick colors,
  // fallback fonts
};
