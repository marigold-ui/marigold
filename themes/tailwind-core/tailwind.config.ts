import type { Config } from 'tailwindcss';

import { createPreset } from './src/preset';

const preset = createPreset({ name: 'core', preflight: false });

// Figma File: https://www.figma.com/file/RiWJBV4Z8L8ycVvUuMYXbm/%F0%9F%93%93-CR---Components-2022?node-id=1452-1785&t=YaLGVHzniD5mOtbJ-0

export default {
  content: [
    'src/root.ts',
    'src/**/*.styles.ts',
    '../../packages/components/**/**.{tsx,ts}',
  ],
  presets: [preset],
  theme: {
    extend: {
      fontFamily: {
        body: 'Arial, Helvetica, sans-serif',
      },
      fontSize: {
        body: '13px',
      },
      colors: {
        root: {
          background: '#8c887d', // Note: not in `secondary`
          body: '#511e04',
        },
        button: {
          base: {
            text: '#4b4b4b',
            background: '#e3e3e3',
            border: '#4b4b4b',
          },
          primary: {
            text: '#ffffff',
            background: '#fa8005',
            border: '#fa8005',
            hover: '#f8ac67',
          },
          link: {
            text: '#990000',
          },
          text: {
            hover: '#e3e3e3',
          },
          disabled: {
            text: '#cccccc',
            background: '#ffffff',
            border: '#cccccc',
          },
        },
        table: {
          header: {
            background: '#808080',
            text: '#ffffff',
            alternativeBackground: '#a9a9a9',
            border: '#ffffff',
            focus: '#fa8005',
          },
          row: {
            hover: '#f7f5f2',
            checked: '#f8ac67',
            focus: '#fa8005',
          },
        },
        // "Reds"
        primary: {
          500: '#f8ac67',
          600: '#fa8005',
          700: '#a50000',
          800: '#990000',
          900: '#511e04',
        },
        // Grays
        secondary: {
          50: '#ffffff',
          100: '#f7f5f2',
          200: '#e3e3e3',
          300: '#e7e4e0',
          400: '#cecac3',
          500: '#a9a9a9',
          600: '#8a8782',
          650: '#808080',
          700: '#6f6b64',
          800: '#4b4b4b',
          900: '#3d3d3d',
        },
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
    },
  },
} satisfies Config;
