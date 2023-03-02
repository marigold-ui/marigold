import resolveConfig from 'tailwindcss/resolveConfig';
/** @type {import('tailwindcss').Config} */
const tailwindConfig: import('tailwindcss').Config = require('./tailwind.config');

const config = resolveConfig(tailwindConfig);
const theme = config.theme;
export default theme;

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
] as const;
