import { typography } from '@marigold/tokens';

export const fonts = {
  mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
  body: 'Merriweather',
  headline: 'Montserrat',
};

export const webFontUrl = [
  'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap',
] as const;

export const fontSizes = {
  fluid: typography.size.fluid,
  fixed: typography.size.fixed,
};

export const fontWeights = {
  ...typography.weight,
};

export const lineHeights = {
  ...typography.lineHeight,
};
