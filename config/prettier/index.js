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
    '^react/(.*)$',
    '^next/(.*)$',
    '^@react-aria/(.*)$',
    '^@react-stately/(.*)$',
    '^@react-types/(.*)$',
    '^@marigold/(.*)$',
    '^@components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
