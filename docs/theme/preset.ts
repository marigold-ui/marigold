import { fontFamily } from 'tailwindcss/defaultTheme';

import { createPreset } from '@marigold/theme-preset';

import { colors } from './tokens';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset({
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
