import { fontFamily } from 'tailwindcss/defaultTheme';

import { createPreset } from '@marigold/theme-preset';

import { colors } from './tokens';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset({
  content: [
    './node_modules/@marigold/components/dist/*.js',
    './node_modules/@marigold/system/dist/*.js',
    './node_modules/@marigold/theme-docs/dist/index.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors,
    },
  },
});
