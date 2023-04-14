import type { Config } from 'tailwindcss';
import { preset } from './src/preset';

// Figma File: https://www.figma.com/file/RiWJBV4Z8L8ycVvUuMYXbm/%F0%9F%93%93-CR---Components-2022?node-id=1452-1785&t=YaLGVHzniD5mOtbJ-0

export default {
  content: [
    ...preset.content,
    'src/root.ts',
    'src/**/*.styles.ts',
    '../../packages/components/**/**.{tsx,ts}',
  ],
  presets: [preset],
} satisfies Config;
