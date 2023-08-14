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
    '^@marigold/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
