import { boxShadow } from 'tailwindcss/defaultTheme';

const brand = {
  primary: {
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
  },

  secondary: {
    '50': '#f9fafb',
    '100': '#f3f4f6',
    '200': '#e5e7eb',
    '300': '#d1d5db',
    '400': '#9ca3af',
    '500': '#6b7280',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
    '950': '#030712',
  },
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
const black = '#000000';

export const colors = {
  // Brand
  // ---------------
  brand,
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
      DEFAULT: brand.secondary[700],
      hover: brand.secondary[800],
      disabled: brand.secondary[400],
    },
    inverted: {
      DEFAULT: brand.secondary[100],
      hover: '',
      disabled: '',
    },
    brand: {
      DEFAULT: '',
      hover: '',
    },
    accent: {
      DEFAULT: brand.primary[600],
      hover: brand.primary[700],
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
  },

  // Background
  // ---------------
  bg: {
    base: {
      DEFAULT: white,
      hover: '',
      active: '',
      disabled: '',
    },
    inverted: {
      DEFAULT: '',
      hover: '',
      active: '',
      disabled: '',
    },
    brand: {
      DEFAULT: brand.secondary[700],
      hover: brand.secondary[600],
      active: brand.secondary[800],
    },
    accent: {
      DEFAULT: brand.primary[700],
      hover: brand.primary[600],
      active: brand.primary[800],
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
      DEFAULT: brand.primary[100],
      input: brand.primary[600],
    },
    surface: {
      DEFAULT: white,
      raised: brand.secondary[400],
      overlay: brand.secondary[700],
      sunken: brand.secondary[200],
    },
  },

  // Border
  // ---------------
  border: {
    base: {
      DEFAULT: brand.secondary[400],
      hover: brand.secondary[500],
      active: '',
      disaled: brand.secondary[400],
    },
    inverted: {
      DEFAULT: brand.secondary[700],
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
      DEFAULT: brand.primary[800],
      input: brand.primary[800],
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
export const component = {
  DEFAULT: 'h-8', // used in inputs
  sm: 'h-6', // not used at all
  lg: 'h-12', // used in button
};
