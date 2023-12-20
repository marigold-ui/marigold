import { createPreset } from '@marigold/theme-preset';
import { flattenObject } from '@marigold/theme-preset/src/utils';

import { screens } from './screens';
import { colors, height, shadow } from './tokens';

export type Preset = ReturnType<typeof createPreset>;

export const preset: Preset = createPreset({
  corePlugins: {
    preflight: false,
  },
  content: [
    './node_modules/@marigold/theme-core/dist/**/*.js',
    './node_modules/@marigold/system/dist/*.js',
    './node_modules/@marigold/components/dist/*.js',
  ],
  theme: {
    extend: {
      screens,
      fontFamily: {
        body: 'Arial, Helvetica, sans-serif',
      },
      fontSize: {
        body: '13px',
      },
      colors,
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      // TODO: Remove gradient
      backgroundImage: {
        highlight: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
      boxShadow: flattenObject(shadow),
      height: flattenObject(height),
    },
  },
});
