module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-prefix-selector': {
      prefix: '[data-theme="rui"]',
      // Peer-dependency fixes in preflight.css must reach the actual
      // `<html>` / `<body>`. Exclude these selectors from prefixing so
      // they stay unscoped; the rest of the bundle stays scoped.
      exclude: ['html', 'body'],
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
