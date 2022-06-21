import * as Token from '@marigold/tokens';
export const base = {
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
/*#__PURE__*/
export const createTheme = ({
  colors: configColors = [],
  fonts: configFonts,
  typography = 'fixed',
  dimensions = 'fixed',
  components = {},
}) => {
  // Create colors (pick from Token or custom)
  let colors = {};
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
    components,
  };
};
//# sourceMappingURL=create-theme.js.map
