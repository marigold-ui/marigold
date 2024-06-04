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

// material palenight theme
const code = {
  '50': '#f6f7f9',
  '100': '#ebecf3',
  '200': '#d3d6e4',
  '300': '#acb3cd',
  '400': '#808cb0',
  '500': '#606e97',
  '600': '#4b557e',
  '700': '#3e4666',
  '800': '#363d56',
  '900': '#292d3e',
  '950': '#202231',
};

export const colors = {
  // Brand
  // ---------------
  ...brand,
  secondary: tw.slate,
  code,

  // Text
  // ---------------
  text: {
    primary: {
      DEFAULT: tw.slate[950],
      muted: tw.slate[500],
    },

    // State
    info: tw.blue[800],
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
      raised: tw.slate[200],
      lowered: tw.slate[700],
      overlay: tw.white,
    },

    // Status
    info: tw.blue[100],
    warning: tw.amber[50],
  },

  // Border
  // ---------------
  border: {
    DEFAULT: tw.slate[300],
    primary: tw.slate[950],
  },
};
