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
      boxShadow: flattenObject(shadow),
      height: flattenObject(height),
      keyframes: {
        'rotate-spinner': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
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
      animation: {
        'rotate-spinner': 'rotate-spinner 2s linear infinite',
        'progress-cycle': 'progress-cycle 1.5s linear infinite',
      },
    },
  },
});
