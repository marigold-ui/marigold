#!/usr/bin/env node

const fs = require('fs');

const resolveConfig = require('tailwindcss/resolveConfig');
const prettier = require('prettier');
const path = require('path');
// bring in the Tailwind config
const tailwindConfig = require('../themes/theme-unicorn/tailwind.config.js');

const { theme } = resolveConfig(tailwindConfig);
const themeStr = JSON.stringify(theme);
const js = `
const theme  = ${themeStr}

export default theme
`;

try {
  fs.writeFileSync(
    path.resolve(process.cwd(), './src/theme.js'),
    prettier.format(js, { parser: 'babel' }),
    'utf-8'
  );
} catch (err) {
  console.log(err.message);
}
