module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-prefix-selector': { prefix: '[data-theme="core"]' },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
