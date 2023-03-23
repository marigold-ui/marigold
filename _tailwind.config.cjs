/** @type {import('tailwindcss').Config} */

console.log(process.cwd());

module.exports = {
  content: ['.storybook/preview.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
};
