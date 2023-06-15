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

export const colors = {
  // Brand
  // ---------------
  brand,

  // Text
  // ---------------
  text: {
    primary: {
      DEFAULT: brand.primary[900],
      light: brand.primary[800],
    },

    dark: '#111',
    light: brand.secondary[50],

    // State
    focus: brand.secondary[50],
    hover: {
      DEFAULT: brand.secondary[50],
      light: brand.secondary[800],
    },
    disabled: '#cccccc',

    // Status
    error: '#f33',
    info: '#008',
    warning: '#d80',
  },

  // Background
  // ---------------
  bg: {
    /**
     * Should be set to either html or body element.
     */
    body: '#f7f5f2',

    surface: {
      /**
       * Use this for e.g. card backgrounds.
       */
      DEFAULT: '#fafaf8',
      /**
       * Use this when you need to separate a specific layer from
       * the surface color, e.g. table headers.
       */
      raised: brand.secondary[500],
      /**
       * Use this when you need to make a specific layer
       * to appear lower than the surface color, e.g. progress bar.
       */
      lowered: '#808080',

      underlay: 'rgba(61, 61, 61, .3)',
    },

    primary: {
      DEFAULT: brand.primary[600],
      // Use this hover when a primary background is hovered
      hover: brand.primary[500],
    },

    neutral: brand.secondary[200],

    // State
    focus: '#3875d7',
    hover: {
      DEFAULT: brand.secondary[900],
      light: brand.secondary[100],
    },
    disabled: {
      DEFAULT: brand.secondary[50],
      dark: '#cccccc',
    },
    selected: '#3ab3d5',

    // Status
    info: '#008',
  },

  // Border
  // ---------------
  border: {
    primary: {
      DEFAULT: brand.primary[600],
      // Use this hover when a primary border is hovered
      hover: brand.primary[500],
    },

    dark: '#4b4b4b',
    neutral: '#aaa',
    light: '#cfcfcf',
    white: '#fff',

    // State
    // ---------------
    disabled: '#cccccc',
    selected: '#3ab3d5',
    focus: '#3875d7',
    hover: '#8d8d8d',

    // Status
    error: '#f33',
    info: '#008',
    warning: '#d80',
  },

  // Outline
  // ---------------
  outline: {
    primary: brand.primary[600],
    focus: '#3875d7',
  },
};
