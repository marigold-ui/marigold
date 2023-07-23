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
  secondary: tw.slate,

  // Text
  // ---------------
  text: {
    primary: {
      DEFAULT: tw.slate[950],
      muted: tw.slate[500],
    },

    // State
    info: tw.blue[950],
    warning: tw.amber[800],
  },

  // Background
  // ---------------
  bg: {
    body: tw.slate[50],
    hover: tw.neutral[100],
    muted: tw.slate[100],

    underlay: tw.slate[500],

    surface: {
      DEFAULT: tw.white,
    },

    // Status
    info: tw.blue[100],
    warning: tw.amber[50],
  },

  // Border
  // ---------------
  border: {
    DEFAULT: tw.slate[300],
  },
};
