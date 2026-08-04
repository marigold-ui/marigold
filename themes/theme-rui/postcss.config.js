module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-prefix-selector': {
      prefix: '[data-theme="rui"]',
      // `html` / `body` carry peer-dependency fixes from `preflight.css`
      // that must reach the actual document root. `:root` / `:host`
      // carry the `@theme` design tokens; leaving them unscoped makes
      // the tokens globally available so the themed paint rule in
      // `styles.css` can resolve them. Utility classes remain scoped
      // under `[data-theme="rui"]` to prevent leaking into host apps
      // that mount Marigold as an island. The regex guards against
      // double-prefixing for rules that target `[data-theme="rui"]`
      // directly (e.g. the themed base paint rule).
      exclude: [
        'html',
        'body',
        ':root',
        ':host',
        /^\[data-theme=['"]rui['"]\]/,
      ],
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
