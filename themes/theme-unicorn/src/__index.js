import resolveConfig from 'tailwindcss/resolveConfig';
/** @type {import('tailwindcss').Config} */

import * as tailwindConfig from './tailwind.config.cjs';

const config = resolveConfig(tailwindConfig);
const theme = config.theme;

export default theme;
