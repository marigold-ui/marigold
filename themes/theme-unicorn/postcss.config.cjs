module.exports = {
  plugins: [
    require('tailwindcss')(),
    require('autoprefixer')(),
    require('postcss-prefix-selector')({
      prefix: '[data-theme="unicorn"]',
      transform: (prefix, selector, prefixedSelector) => {
        switch (selector) {
          case 'body':
            return selector + prefix;
          case 'html':
            return selector;
          default:
            return prefixedSelector;
        }
      },
    }),
  ],
};
