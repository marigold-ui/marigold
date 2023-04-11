module.exports = {
  plugins: [
    require('tailwindcss')(),
    require('autoprefixer')({
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    }),
    require('postcss-prefix-selector')({
      prefix: '[data-theme="core"]',
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
