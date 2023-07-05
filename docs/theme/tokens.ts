import tw from 'tailwindcss/colors';

const brand = {
  primary: {
    50: '#fff2e6',
    100: '#fee6cd',
    200: '#fdcc9b',
    300: '#fcb369',
    400: '#fb9937',
    500: '#fa8005',
    600: '#c86604',
    700: '#964d03',
    800: '#643302',
    900: '#321a01',
    950: '#190d00',
  },
};

export const colors = {
  // Brand
  // ---------------
  ...brand,

  // Text
  // ---------------
  text: {
    primary: {
      DEFAULT: brand.primary[950],
    },

    // State
    info: tw.sky[950],
    warning: tw.amber[950],
  },

  // Background
  // ---------------
  bg: {
    body: '#fff',

    // Status
    info: tw.sky[100],
    warning: tw.amber[100],
  },

  // Border
  // ---------------
  border: {
    info: tw.sky[950],
    warning: tw.amber[950],
  },
};
