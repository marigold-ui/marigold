module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-prefix-selector': { prefix: '[data-theme="rui"]' },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
