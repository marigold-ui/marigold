module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  tabWidth: 2,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  pluginSearchDirs: ['.'],
};
