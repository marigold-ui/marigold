import resolveConfig from 'tailwindcss/resolveConfig';
/** @type {import('tailwindcss').Config} */
//const tailwindConfig = require('./tailwind.config');
import * as tailwindConfig from './tailwind.config.js';

const config = resolveConfig(tailwindConfig);
const theme = config.theme;
export default config;
