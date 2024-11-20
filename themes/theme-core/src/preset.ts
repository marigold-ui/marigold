import { createPreset, flattenObject } from '@marigold/theme-preset';
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
      // TODO: Remove gradient
      backgroundImage: {
        highlight: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
      boxShadow: flattenObject(shadow),
      height: flattenObject(height),
      animation: {
        'progress-cycle':
          'progress-cycle 1s cubic-bezier(.6, .1, .3, .9) infinite,progress-cycle 1s cubic-bezier(.25, .1, .25, 1.3) infinite',
      },
      keyframes: {
        'progress-cycle': {
          '0%': {
            transform: 'rotate(0deg)',
            strokeDashoffset: '75',
          },
          '30%': {
            strokeDashoffset: '20',
          },
          '100%': {
            transform: 'rotate(360deg)',
            strokeDashoffset: '75',
          },
        },
      },
    },
  },
});
