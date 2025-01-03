import { fontFamily } from 'tailwindcss/defaultTheme';
import { createPreset } from '@marigold/theme-preset';
import { screens } from './screens';
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
      screens,
    },
    extend: {
      fontFamily: {
        body: ['var(--font-sans)', ...fontFamily.sans],
      },
      animation: {
        'shiny-text': 'shiny-text 8s infinite',
      },
      keyframes: {
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
      },
      colors,
    },
  },
});
