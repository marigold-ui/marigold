#!/usr/bin/env node

const fs = require('fs');

const resolveConfig = require('tailwindcss/resolveConfig');
const prettier = require('prettier');
const path = require('path');
// bring in the Tailwind config
const tailwindConfig = require('../themes/theme-unicorn/tailwind.config.js');

const { theme } = resolveConfig(tailwindConfig);
console.log(theme);
const themeStr = JSON.stringify(theme);
const js = `
const theme  = ${themeStr}

export default theme
`;

try {
  // not sure what a path
  fs.writeFileSync(
    path.resolve(
      process.cwd(),
      '../marigold/themes/theme-unicorn/src/index.js'
    ),
    prettier.format(js, { parser: 'babel' }),
    'utf-8'
  );
} catch (err) {
  console.log(err.message);
}
