// Tailwind Colors
// ---------------
/**
 * We copy/pasted the colors here to not end up with a lot of unused code in our bundle.
 */

const white = '#fff';

const amber = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
  950: '#451a03',
};

const blue = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',
};

const green = {
  50: '#f0fdf4',
  100: '#ecfccb',
  200: '#d9f99d',
  300: '#bef264',
  400: '#a3e635',
  500: '#84cc16',
  600: '#65a30d',
  700: '#4d7c0f',
  800: '#3f6212',
  900: '#365314',
  950: '#1a2e05',
};

const neutral = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0a0a0a',
};

const red = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
  950: '#450a0a',
};

const slate = {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
  950: '#020617',
};

// Custom Colors
// ---------------
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
  secondary: slate,
  code,

  // Text
  // ---------------
  text: {
    primary: {
      DEFAULT: slate[950],
      muted: slate[500],
    },

    // State
    info: blue[800],
    warning: amber[800],
  },

  // Background
  // ---------------
  bg: {
    body: slate[50],
    hover: neutral[100],
    muted: slate[100],

    underlay: slate[500],

    surface: {
      DEFAULT: white,
      raised: slate[200],
      lowered: slate[700],
      overlay: white,
    },

    // Status
    success: green[100],
    error: red[50],
    info: blue[50],
    warning: amber[50],
  },

  // Border
  // ---------------
  border: {
    DEFAULT: slate[300],
    primary: slate[950],

    // status
    success: green[600],
    error: red[600],
  },
} as const;
