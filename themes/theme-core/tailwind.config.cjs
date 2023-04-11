/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,tsx}', 'packages/components/src/**/**.tsx'],
  presets: [require('./src/colors.ts')],
  safelist: [
    'items-start',
    'items-center',
    'items-end',
    'justify-start',
    'justify-center',
    'justify-end',
    'flex-col',
    'p-0',
    'w-full',
    'h-full',
    'gap-4',
    'gap-8',
    'gap-16',
    'gap-24',
    'gap-32',
    'gap-40',
    'gap-48',
  ],
  theme: {
    extend: {
      breakpoints: ['40em', '52em', '64em'],

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
      root: {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'body',
          bg: '#e7e4e0',
        },
      },
      radii: {
        none: 0,
        small: 2,
        medium: 4,
        large: 8,
        xlarge: 10,
      },
      fonts: {
        body: 'Arial, Helvetica, sans-serif',
        heading: 'Arial, Helvetica, sans-serif',
      },
      fontSizes: {
        xxsmall: '0.875rem',
        xsmall: '1rem',
        small: '1.125rem',
        medium: '1.25rem',
        large: '1.5rem',
        xlarge: '2rem',
      },
      fontWeights: {
        body: 400,
        heading: 900,
        bold: 700,
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
  },
};
