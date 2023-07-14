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

  blue: {
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
  },

  red: {
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
  },

  yellow: {
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
  },

  green: {
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
  },
} as const;

export const colors = {
  // Brand
  // ---------------
  brand,

  // Text
  // ---------------
  text: {
    body: {
      DEFAULT: brand.secondary[700],
      accent: brand.secondary[500],
    },

    link: brand.blue[400],

    light: brand.secondary[100],

    // State
    disabled: brand.secondary[400],
    error: brand.red[500],
    hover: brand.secondary[800],
  },

  // Background
  // ---------------
  bg: {
    /**
     * Should be set to either html or body element.
     */
    body: brand.secondary[50],
    neutral: brand.secondary[200],

    primary: {
      DEFAULT: brand.primary[600],
      light: brand.primary[100],
      hover: brand.primary[400],
    },

    secondary: {
      DEFAULT: brand.secondary[700],
      hover: brand.secondary[600],
    },

    surface: {
      /**
       * Use this for e.g. card backgrounds.
       */
      DEFAULT: brand.secondary[50],
      /**
       * Use this when you need to separate a specific layer from
       * the surface color, e.g. table headers.
       */
      raised: brand.secondary[500],
      /**
       * Use this when you need to make a specific layer
       * to appear lower than the surface color, e.g. progress bar.
       */
      lowered: brand.secondary[700],

      underlay: 'rgba(206, 212, 218, 0.5)',
    },

    // State
    disabled: brand.secondary[200],
    hover: { DEFAULT: brand.secondary[400], light: brand.secondary[200] },
    focus: brand.secondary[200],
    selected: {
      DEFAULT: brand.primary[100],
      input: brand.primary[600],
    },

    // Status
    info: brand.blue[500],
  },

  // Shadow
  // ---------------
  shadow: {
    light: brand.secondary[400],

    // state
    focus: brand.primary[600],

    // status
    error: brand.red[500],
    selected: brand.red[700],
    disabled: brand.secondary[400],
  },

  // Border
  // ---------------
  border: {
    light: brand.secondary[400],
    dark: brand.secondary[700],

    // State
    disabled: brand.secondary[400],
    hover: brand.secondary[500],
    focus: brand.primary[600],
    selected: brand.primary[800],

    // Status
    error: brand.red[500],
    info: brand.blue[500],
    warning: brand.yellow[500],
  },

  // Outline
  // ---------------
  outline: {
    dark: brand.secondary[700],

    // State
    focus: brand.blue[400],

    // Status
    error: brand.red[500],
  },

  // Fill
  // ---------------
  fill: {
    // Status
    required: brand.red[500],
    error: brand.red[500],
    info: brand.blue[500],
    warning: brand.yellow[500],
  },
};
