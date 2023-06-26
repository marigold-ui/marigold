import { typography } from '@marigold/tokens';

export const fonts = {
  mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
  body: 'Merriweather, serif',
  headline: 'Montserrat, sans-serif',
};

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=fira-mono:400,500,700|merriweather:300,300i,400,400i,700,700i,900,900i|montserrat:200,300,400,500,600,700,800,900',
] as const;

export const fontSizes = {
  ...typography.size,
};

export const fontWeights = {
  ...typography.weight,
};

export const lineHeights = {
  ...typography.lineHeight,
};
