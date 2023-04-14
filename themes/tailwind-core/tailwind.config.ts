import type { Config } from 'tailwindcss';

import { createPreset } from './src/preset';

const preset = createPreset({ name: 'core', preflight: false });

// Figma File: https://www.figma.com/file/RiWJBV4Z8L8ycVvUuMYXbm/%F0%9F%93%93-CR---Components-2022?node-id=1452-1785&t=YaLGVHzniD5mOtbJ-0

export default {
  content: [
    'src/root.ts',
    'src/**/*.styles.ts',
    '../../packages/components/**/**.{tsx,ts}',
  ],
  presets: [preset],
} satisfies Config;
