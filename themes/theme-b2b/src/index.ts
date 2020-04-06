import { BaseTheme } from '@marigold/components';

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#4b4b4b',
    background: '#fafafa',
    primary: '#fa8005',
    secondary: '#4b4b4b',
    muted: '#8d8d8d',
  },
  form: {
    label: {
      fontFamily: 'body',
      fontSize: 0,
      fontWeight: 'body',
      lineHeight: '1.5rem',
      color: 'text',
      display: 'flex',
      alignItems: 'center',
    },
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
