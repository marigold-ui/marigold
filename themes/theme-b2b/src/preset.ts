import type { Config } from 'tailwindcss/types/config';
import { createPreset } from '@marigold/theme-preset';

import { screens } from './screens';
import { colors } from './tokens';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

type Preset = ReturnType<typeof createPreset>;

export const preset: Preset = createPreset('b2b', {
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {
      screens,
      fontFamily: {
        body: ['Inter, sans-serif'],
        heading: ['"Inter Black, sans-serif"'],
      },
      colors,
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
    },
  },
});
