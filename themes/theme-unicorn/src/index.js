import resolveConfig from 'tailwindcss/resolveConfig';
/** @type {import('tailwindcss').Config} */
//const tailwindConfig = require('./tailwind.config');
import * as tailwindConfig from './tailwind.config.js';

const config = resolveConfig(tailwindConfig);
const theme = config.theme;
export default theme;

export const webFontUrl = [
  'https://fonts.bunny.net/css?family=inter:400,600,700',
];
