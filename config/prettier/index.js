module.exports = {
  arrowParens: 'avoid',
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
  tabWidth: 2,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    '@trivago/prettier-plugin-sort-imports',
  ],
  pluginSearchDirs: ['.'],
  importOrder: [
    '^@components/(.*)$',
    '^next/(.*)$',
    '^@react-aria/(.*)$',
    '^@react-stately/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
