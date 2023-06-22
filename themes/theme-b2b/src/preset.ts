import { createPreset } from '@marigold/theme-preset';

import { theme } from './theme';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset('b2b', {
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {
      screens: theme.screens,
      fontFamily: {
        body: ['Inter, sans-serif'],
        heading: ['"Inter Black, sans-serif"'],
      },
      colors: theme.colors,
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
    },
  },
});
