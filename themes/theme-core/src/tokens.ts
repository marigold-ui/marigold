import { boxShadow } from 'tailwindcss/defaultTheme';

const brand = {
  primary: {
    500: '#f8ac67',
    600: '#fa8005',
    700: '#a50000',
    800: '#990000',
    900: '#511e04',
  },
  secondary: {
    50: '#ffffff',
    100: '#f7f5f2',
    200: '#e3e3e3',
    300: '#e7e4e0',
    350: '#cfcfcf',
    400: '#cecac3',
    500: '#a9a9a9',
    600: '#8a8782',
    650: '#808080',
    700: '#6f6b64',
    800: '#4b4b4b',
    900: '#3d3d3d',
  },
} as const;

const white = '#ffff';
const black = '#111';

const green = {
  '50': '#e9ffe4',
  '100': '#ccffc4',
  '200': '#9eff90',
  '300': '#5fff50',
  '400': '#29fe1d',
  '500': '#07e500',
  '600': '#00b800',
  '700': '#008800',
  '800': '#076d08',
  '900': '#0b5c0d',
  '950': '#003404',
} as const;

const yellow = {
  '50': '#fefbe8',
  '100': '#fff6c2',
  '200': '#ffeb88',
  '300': '#ffd743',
  '400': '#ffc010',
  '500': '#efa703',
  '600': '#dd8800',
  '700': '#a45904',
  '800': '#87450c',
  '900': '#733910',
  '950': '#431c05',
} as const;

const red = {
  '50': '#fff1f1',
  '100': '#ffdfdf',
  '200': '#ffc5c5',
  '300': '#ff9d9d',
  '400': '#ff6464',
  '500': '#ff3333',
  '600': '#ed1515',
  '700': '#c80d0d',
  '800': '#a50f0f',
  '900': '#881414',
  '950': '#4b0404',
} as const;

const blue = {
  '50': '#f1f4ff',
  '100': '#e5e8ff',
  '200': '#ced5ff',
  '300': '#a7b1ff',
  '400': '#767fff',
  '500': '#3f42ff',
  '600': '#2118ff',
  '700': '#1007fa',
  '800': '#0d05d2',
  '900': '#0c06ac',
  '950': '#000088',
} as const;

export const colors = {
  // Brand
  // ---------------
  brand,
  white,
  black,
  green,
  yellow,
  red,
  blue,

  // Text
  // ---------------
  text: {
    base: {
      DEFAULT: brand.primary[900],
      hover: brand.secondary[800],
      disabled: brand.secondary[300],
    },
    inverted: {
      DEFAULT: brand.secondary[50],
      hover: brand.secondary[50],
      disabled: '',
    },
    brand: {
      DEFAULT: '',
      hover: '',
    },
    accent: {
      DEFAULT: '',
      hover: '',
    },
    info: {
      DEFAULT: blue[950],
      hover: blue[900],
    },
    success: {
      DEFAULT: green[700],
      hover: green[600],
    },
    warning: {
      DEFAULT: yellow[600],
      hover: yellow[700],
    },
    error: {
      DEFAULT: red[500],
      hover: red[600],
    },
  },

  // Background
  // ---------------
  bg: {
    base: {
      DEFAULT: white,
      hover: brand.secondary[900],
      active: '',
      disaled: brand.secondary[300],
    },
    inverted: {
      DEFAULT: brand.secondary[200],
      hover: brand.secondary[100],
      active: '',
      disaled: brand.secondary[50],
    },
    brand: {
      DEFAULT: brand.primary[600],
      hover: brand.primary[500],
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
      DEFAULT: green[600],
      hover: green[700],
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
      DEFAULT: blue[400],
      input: '',
    },
    surface: {
      DEFAULT: brand.secondary[100],
      raised: brand.secondary[500],
      overlay: brand.secondary[650],
      sunken: brand.secondary[900],
    },
  },

  // Border
  // ---------------
  border: {
    base: {
      DEFAULT: brand.secondary[800],
      hover: brand.secondary[650],
      active: '',
      disaled: brand.secondary[300],
    },
    inverted: {
      DEFAULT: brand.secondary[350],
      hover: '',
      active: '',
      disaled: '',
    },
    brand: {
      DEFAULT: brand.primary[600],
      hover: brand.primary[500],
      active: '',
    },
    accent: {
      DEFAULT: '',
      hover: '',
      active: '',
    },
    info: {
      DEFAULT: blue[950],
      hover: '',
      active: '',
    },
    success: {
      DEFAULT: green[600],
      hover: '',
      active: '',
    },
    warning: {
      DEFAULT: yellow[600],
      hover: '',
      active: '',
    },
    error: {
      DEFAULT: red[500],
      hover: '',
      active: '',
    },
    selected: {
      DEFAULT: blue[400],
      input: '',
    },
  },

  // Outline
  // ---------------
  outline: {
    focus: {
      DEFAULT: blue[500],
    },
  },
};

export const shadow = {
  surface: {
    DEFAULT: boxShadow.none,
    raise: boxShadow.sm,
    overlay: boxShadow.md,
    sunken: boxShadow.none,
  },
};

export const component = {
  height: {
    DEFAULT: 'h-[22px]',
    sm: 'h-4', // 16 px
    lg: 'h-6', // 24 px
  },
};
