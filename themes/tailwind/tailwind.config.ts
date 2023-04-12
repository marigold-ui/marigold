import type { Config } from 'tailwindcss';

import { createPreset } from './src/preset';

const preset = createPreset({ name: 'unicorn' });

export default {
  content: [],
  presets: [preset],
} satisfies Config;
