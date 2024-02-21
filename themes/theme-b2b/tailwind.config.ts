import type { Config } from 'tailwindcss';

import { preset } from './src/preset';

export default {
  important: '[data-theme="b2b"]',
  content: [
    'src/root.ts',
    'src/colors.ts',
    'src/**/*.*.ts',
    '../../packages/{components,system}/**/*.{tsx,ts}',
    '!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  safelist: [{ pattern: /(bg|text|border|shadow)-./ }],
  presets: [preset],
} satisfies Config;
