import { Config } from 'tailwindcss/types/config';
import { preset } from './theme/preset';

const config: Config = {
  content: [
    ...preset.content,

    // From docs
    './theme/root.ts',
    './theme/*.ts',
    './theme/**/*.ts',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Demos
    './content/**/*.{js,ts,jsx,tsx,mdx}',

    // Used for the anchor links
    './contentlayer.config.ts',

    // Marigold components
    '../packages/{components,system}/**/*.{tsx,ts}',
    '!../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
  plugins: [require('@tailwindcss/typography')],
};

export default config;
