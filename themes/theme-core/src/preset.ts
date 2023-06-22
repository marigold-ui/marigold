import { createPreset } from '@marigold/theme-preset';

import { theme } from './theme';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset('core', {
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: theme.screens,
      fontFamily: {
        body: 'Arial, Helvetica, sans-serif',
      },
      fontSize: {
        body: '13px',
      },
      colors: theme.colors,
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      // TODO: Remove gradient
      backgroundImage: {
        highlight: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
    },
  },
});
