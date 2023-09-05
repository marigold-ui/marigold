import { createPreset } from '@marigold/theme-preset';

import { screens } from './screens';
import { colors } from './tokens';

export type Preset = ReturnType<typeof createPreset>;

export const preset: Preset = createPreset('b2b', {
  content: [
    './node_modules/@marigold/theme-b2b/dist/*.js',
    './node_modules/@marigold/system/dist/*.js',
    './node_modules/@marigold/components/dist/*.js',
  ],
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
