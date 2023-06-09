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

    // State
    disabled: brand.secondary[400],
    error: '#dd4142',
  },

  // Background
  // ---------------
  bg: {
    /**
     * Should be set to either html or body element.
     */
    body: brand.secondary[50],

    surface: {
      /**
       * Use this for e.g. card backgrounds.
       */
      DEFAULT: brand.secondary[50],

      underlay: 'rgba(206, 212, 218, 0.5)',
    },

    // State
    disabled: brand.secondary[200],
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
    // State
    focus: brand.primary[600],

    // Status
    error: '#dd4142',
  },

  // Fill
  // ---------------
  fill: {
    // Status
    required: 'rgb(221, 65, 66)',
  },
};
