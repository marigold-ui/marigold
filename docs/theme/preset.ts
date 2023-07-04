import { fontFamily } from 'tailwindcss/defaultTheme';

import { createPreset } from '@marigold/theme-preset';
import { colors } from './tokens';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset('docs', {
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['"Inter Black, sans-serif"'],
      },
      colors,
    },
  },
});
