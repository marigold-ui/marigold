const brand = {
  primary: {
    100: '#fff8f1',
    200: '#fdcca0',
    400: '#f8ac67',
    600: '#fa8005',
    700: '#ea5200',
    800: '#ae440a',
  },
  secondary: {
    50: '#ffffff',
    100: '#fafafa',
    200: '#f3f3f3',
    300: '#e3e3e3',
    400: '#cccccc',
    500: '#8d8d8d',
    600: '#6d6d6d',
    700: '#4b4b4b',
    800: '#2b2b2b',
    900: '#0f0f0f',
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
      DEFAULT: brand.secondary[700],
    },

    light: brand.secondary[100],

    // State
    disabled: brand.secondary[400],
  },

  // Background
  // ---------------
  bg: {
    /**
     * Should be set to either html or body element.
     */
    body: brand.secondary[50],
    primary: brand.primary[600],
    dark: brand.secondary[700],

    surface: {
      /**
       * Use this for e.g. card backgrounds.
       */
      DEFAULT: brand.secondary[50],
    },

    // State
    disabled: brand.secondary[200],
    hover: brand.secondary[400],
  },

  // Border
  // ---------------
  border: {
    light: brand.secondary[400],

    // State
    hover: brand.secondary[500],
    focus: brand.primary[600],

    // Status
    error: '#dd4142',
  },

  // Outline
  // ---------------
  outline: {
    dark: brand.secondary[700],
    // State
    focus: brand.primary[600],

    // Status
    error: '#dd4142',
  },
};
