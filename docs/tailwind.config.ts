import type { Config } from 'tailwindcss';
import { preset } from './theme/preset';

// Figma File: https://www.figma.com/file/RiWJBV4Z8L8ycVvUuMYXbm/%F0%9F%93%93-CR---Components-2022?node-id=1452-1785&t=YaLGVHzniD5mOtbJ-0

export default {
  content: [
    ...preset.content,

    // From docs
    './theme/root.ts',
    './theme/colors.ts',
    './theme/**/*.*.ts',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Marigold components
    '../../packages/{components,system}/**/*.{tsx,ts}',
    '!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
} satisfies Config;
