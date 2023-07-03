import { Config } from 'tailwindcss/types/config';
import { preset } from './theme/preset';

const config: Config = {
  content: [
    ...preset.content,

    // From docs
    './theme/root.ts',
    './theme/colors.ts',
    './theme/**/*.ts',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Marigold components
    '../../packages/{components,system}/**/*.{tsx,ts}',
    '!../../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
};

export default config;
