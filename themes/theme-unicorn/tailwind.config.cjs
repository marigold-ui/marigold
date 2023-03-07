/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    breakpoints: ['40em', '52em', '64em'],
    space: {
      none: 0,
      xxsmall: 3,
      xsmall: 12,
      small: 18,
      medium: 24,
      large: 34,
      xlarge: 42,
      xxlarge: 64,
    },
    sizes: {
      none: 0,
      xxsmall: 16,
      xsmall: 32,
      small: 40,
      medium: 80,
      large: 120,
      xlarge: 160,
      xxlarge: 240,
      huge: 320,
      epic: 480,
    },
    colors: {
      primary: '#673ab7',
      secondary: '#9575cd',
      disabled: '#e9e7eb',
      error: '#ffb2b1',
      warning: '#fff3ad',
      info: '#a2edff',
      success: '#bcffbc',
    },
    root: {
      body: {
        margin: 0,
        padding: 0,
        fontFamily: 'body',
        bg: 'gray00',
      },
    },
    radii: {
      none: 0,
      small: 2,
      medium: 4,
      large: 8,
      huge: 16,
    },
    fonts: {
      body: 'Arial',
      heading: 'Roboto',
    },
    fontSizes: {
      xxsmall: '0.66rem',
      xsmall: '1rem',
      small: '1.33rem',
      medium: '1.66rem',
      large: '2rem',
      xlarge: '2.33rem',
    },
    fontWeights: {
      body: 300,
      heading: 800,
      bold: 600,
    },
    lineHeights: {
      xsmall: 1,
      small: 1.125,
      medium: 1.5,
      large: 2,
      xlarge: 2.5,
      xxlarge: 3,
    },
  },
};

//const tailwindConfig = require('./tailwind.config.js');
// import * as tailwindConfig from './src/tailwind.config.cjs';

// export default tailwindConfig;
