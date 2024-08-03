import { Config } from 'tailwindcss/types/config';
import { preset } from '@marigold/theme-docs/preset';

const config: Config = {
  content: [
    ...preset.content,

    // From docs
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Docs theme
    '../themes/theme-docs/src/**/*.ts',

    // Demos
    './content/**/*.{js,ts,jsx,tsx,mdx}',

    // Used for the anchor links
    './contentlayer.config.ts',

    // Marigold components
    '../packages/{components,system}/**/*.{tsx,ts}',
    '!../packages/{components,system}/**/*.{stories,test}.{tsx,ts}',
  ],
  presets: [preset],
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
  ],
};

export default config;
