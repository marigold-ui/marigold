import { Config } from 'tailwindcss/types/config';

import { preset } from '@marigold/theme-docs/preset';

const config: Config = {
  content: [
    ...preset.content,

    // From docs
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
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};

export default config;
