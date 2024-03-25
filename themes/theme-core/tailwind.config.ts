import type { Config } from 'tailwindcss';
import { scopedPreflightStyles } from 'tailwindcss-scoped-preflight';

import { preset } from './src/preset';

// Figma File: https://www.figma.com/file/RiWJBV4Z8L8ycVvUuMYXbm/%F0%9F%93%93-CR---Components-2022?node-id=1452-1785&t=YaLGVHzniD5mOtbJ-0
export default {
  important: '[data-theme="core"]',
  content: [
    'src/root.ts',
    'src/colors.ts',
    'src/**/*.*.ts',
    '../../packages/{components,system}/**/*.{tsx,ts}',
    '!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
  plugins: [
    scopedPreflightStyles({
      // data-app is defined in core
      cssSelector: '[data-app]',
      mode: 'matched only',
    }),
  ],
  safelist: [{ pattern: /(bg|text|border|shadow)-./ }],
} satisfies Config;
