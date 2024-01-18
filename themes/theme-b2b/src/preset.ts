import { fontFamily } from 'tailwindcss/defaultTheme';

import { createPreset, flattenObject } from '@marigold/theme-preset';

import { screens } from './screens';
import { colors, height, shadow } from './tokens';

export type Preset = ReturnType<typeof createPreset>;

export const preset: Preset = createPreset({
  content: [
    './node_modules/@marigold/theme-b2b/dist/*.js',
    './node_modules/@marigold/system/dist/*.js',
    './node_modules/@marigold/components/dist/*.js',
  ],
  theme: {
    extend: {
      screens,
      fontFamily: {
        body: ['Inter', ...fontFamily.sans],
      },
      colors,
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      boxShadow: flattenObject(shadow),
      height: flattenObject(height),
    },
  },
});
