import { BaseTheme } from '@marigold/components';

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Oswald Regular',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 300,
    heading: 800,
    bold: 600,
  },
  lineHeights: {
    body: 2,
    heading: 1.5,
  },
  colors: {
    text: '#ffe6f7',
    background: '#b30077',
    primary: '#00b300',
    secondary: '#e6b800',
    muted: '#99994d',
  },
  text: {
    body: {
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    heading: {
      fontFamily: 'heading',
      fontSize: 5,
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'text',
    },
  },
};

export default theme;
