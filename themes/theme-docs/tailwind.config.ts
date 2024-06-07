import type { Config } from 'tailwindcss';

import { preset } from './src/preset';

export default {
  content: [
    'src/**/*.*.ts',
    '../../packages/{components,system}/**/*.{tsx,ts}',
    '!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
} satisfies Config;
