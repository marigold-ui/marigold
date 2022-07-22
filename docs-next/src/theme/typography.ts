import { typography } from '@marigold/tokens';

export const fonts = {
  mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
  body: 'Lora',
  headline: 'Montserrat',
};

export const webFontUrl = [
  'https://fonts.googleapis.com/css2?family=Lora:wght@400..700&display=swap',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap',
  'https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap',
] as const;

export const fontSizes = {
  ...typography.size.fluid,
};

export const fontWeights = {
  ...typography.weight,
};

export const lineHeights = {
  ...typography.lineHeight,
};
