import { boxShadow } from 'tailwindcss/defaultTheme';

// reservix colors from confluence page
const brand = {
  '50': '#f7f7f7',
  '100': '#edecec',
  '200': '#dfdede',
  '300': '#c8c8c8',
  '400': '#adadad',
  '500': '#9d9c9c',
  '600': '#898787',
  '700': '#7b7a7a',
  '800': '#676666',
  '900': '#545454',
  '950': '#363535',
} as const;

const accent = {
  '50': '#fffaec',
  '100': '#fff4d4',
  '200': '#ffe5a7',
  '300': '#ffd170',
  '400': '#ffb136',
  '500': '#ff980f',
  '600': '#fa8005',
  '700': '#c85e06',
  '800': '#9e490e',
  '900': '#7f3d0f',
  '950': '#451d05',
} as const;

const gray = {
  50: '#fafaf9',
  100: '#f5f5f4',
  200: '#e7e5e4',
  300: '#d6d3d1',
  400: '#a8a29e',
  500: '#78716c',
  600: '#57534e',
  700: '#44403c',
  800: '#292524',
  900: '#1c1917',
  950: '#0c0a09',
} as const;

const green = {
  '50': '#f7fce9',
  '100': '#eef8cf',
  '200': '#dcf1a5',
  '300': '#c3e670',
  '400': '#a8d744',
  '500': '#8bbd26',
  '600': '#6b961a',
  '700': '#527318',
  '800': '#425b19',
  '900': '#394e19',
  '950': '#1c2a09',
};

const yellow = {
  '50': '#ffffe7',
  '100': '#feffc1',
  '200': '#fffd86',
  '300': '#fff441',
  '400': '#ffe60d',
  '500': '#eac500',
  '600': '#d19e00',
  '700': '#a67102',
  '800': '#89580a',
  '900': '#74480f',
  '950': '#442504',
};

const red = {
  '50': '#fdf3f3',
  '100': '#fce4e4',
  '200': '#f9cfcf',
  '300': '#f4adad',
  '400': '#ec7d7e',
  '500': '#dd4142',
  '600': '#cc3637',
  '700': '#ab2a2b',
  '800': '#8e2627',
  '900': '#772526',
  '950': '#400f0f',
};

const blue = {
  '50': '#eefbfd',
  '100': '#d5f2f8',
  '200': '#b0e5f1',
  '300': '#79d0e7',
  '400': '#3ab3d5',
  '500': '#1f96bb',
  '600': '#1d799d',
  '700': '#1e6280',
  '800': '#215269',
  '900': '#1f455a',
  '950': '#0f2c3d',
};
const white = '#ffff';
const black = gray[950];

export const colors = {
  // Brand
  // ---------------
  brand,
  accent,
  gray,
  blue,
  yellow,
  green,
  red,
  white,
  black,

  // Text
  // ---------------
  text: {
    base: {
      DEFAULT: gray[700],
      hover: gray[800],
      disabled: gray[400],
    },
    inverted: {
      DEFAULT: gray[100],
      hover: '',
      disabled: '',
    },
    brand: {
      DEFAULT: '',
      hover: '',
    },
    accent: {
      DEFAULT: accent[600],
      hover: accent[700],
    },
    info: {
      DEFAULT: blue[500],
      hover: blue[600],
    },
    success: {
      DEFAULT: green[700],
      hover: green[800],
    },
    warning: {
      DEFAULT: yellow[500],
      hover: yellow[600],
    },
    error: {
      DEFAULT: red[500],
      hover: red[600],
    },
    link: {
      DEFAULT: blue[400],
      hover: blue[500],
    },
  },

  // Background
  // ---------------
  bg: {
    base: {
      DEFAULT: white,
      hover: gray[300],
      active: '',
      disabled: brand[200],
    },
    inverted: {
      DEFAULT: gray[700],
      hover: '',
      active: '',
      disabled: '',
    },
    brand: {
      DEFAULT: brand[700],
      hover: brand[600],
      active: brand[800],
    },
    accent: {
      DEFAULT: accent[600],
      hover: accent[700],
      active: accent[800],
    },
    info: {
      DEFAULT: blue[500],
      hover: blue[600],
      active: blue[700],
    },
    success: {
      DEFAULT: green[600],
      hover: green[500],
      active: green[700],
    },
    warning: {
      DEFAULT: yellow[600],
      hover: yellow[500],
      active: yellow[700],
    },
    error: {
      DEFAULT: red[600],
      hover: red[500],
      active: red[700],
    },
    selected: {
      DEFAULT: accent[100],
      input: accent[600],
    },
    surface: {
      DEFAULT: white,
      raised: gray[400],
      overlay: gray[700],
      sunken: gray[200],
    },
  },

  // Border
  // ---------------
  border: {
    base: {
      DEFAULT: gray[400],
      hover: gray[500],
      active: '',
      disaled: gray[400],
    },
    inverted: {
      DEFAULT: gray[700],
      hover: '',
      active: '',
      disaled: '',
    },
    brand: {
      DEFAULT: '',
      hover: '',
      active: '',
    },
    accent: {
      DEFAULT: '',
      hover: '',
      active: '',
    },
    info: {
      DEFAULT: blue[500],
      hover: blue[600],
      active: blue[700],
    },
    success: {
      DEFAULT: green[700],
      hover: green[600],
      active: green[800],
    },
    warning: {
      DEFAULT: yellow[500],
      hover: yellow[600],
      active: yellow[700],
    },
    error: {
      DEFAULT: red[500],
      hover: red[600],
      active: red[700],
    },
    selected: {
      DEFAULT: accent[800],
      input: accent[800],
    },
  },

  // Outline
  // ---------------
  outline: {
    focus: {
      DEFAULT: blue[400],
    },
  },
};

// Shadow
// ---------------
export const shadow = {
  surface: {
    DEFAULT: boxShadow.none,
    raised: boxShadow.sm,
    overlay: boxShadow.lg,
    sunken: boxShadow.none,
  },
};

// Component Height
// ---------------
export const height = {
  component: {
    DEFAULT: '32px', // used in inputs
    sm: '24px', // not used at all
    lg: '48px', // used in button
  },
};
