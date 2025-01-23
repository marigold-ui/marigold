import type { Config } from 'tailwindcss';
import { preset } from './src/preset';

export default {
  // important: '[data-theme="b2b"]',
  /* corePlugins: {
    preflight: false,
  },
@import "tailwindcss/theme" layer(theme);*/
  content: [
    //'src/root.ts',
    //'src/colors.ts', -> doesn't exist in b2b theme
    //'src/**/*.*.ts',
    //'../../packages/{components,system}/**/*.{tsx,ts}',
    //'!../../packages/{components,system}/node_modules/**/*.{tsx,ts}',
    //'!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  safelist: [{ pattern: /(bg|text|border|shadow)-./ }],
  presets: [preset],
} satisfies Config;
