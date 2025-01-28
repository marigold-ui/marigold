module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-prefix-selector': { prefix: '[data-theme="b2b"]' },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
