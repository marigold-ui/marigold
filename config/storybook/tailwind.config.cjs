/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.storybook/preview.tsx',
    '../../packages/{components,system}/**/*.stories.{tsx,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
