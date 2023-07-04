import { createPreset } from '@marigold/theme-preset';

export interface PresetConfig {
  name: string;
  preflight?: boolean;
}

export const preset = createPreset('docs', {
  important: undefined,
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
});
