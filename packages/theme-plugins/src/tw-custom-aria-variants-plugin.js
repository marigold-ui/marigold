const plugin = require('tailwindcss/plugin');

module.exports =
  // Aria Variants
  plugin(({ addVariant }) => {
    addVariant('aria-enabled', ['&:not([aria-disabled=true])']);
  });
