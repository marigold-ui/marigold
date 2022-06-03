/**
 * Normalize styling of certain elements between browsers.
 * Based on https://www.joshwcomeau.com/css/custom-css-reset/
 */
export const document = {
  'html, body': {
    height: '100%',
  },

  html: {
    /**
     * Prevent Mobile Safari from zooming stuff ...
     * Source: https://css-tricks.com/your-css-reset-needs-text-size-adjust-probably/
     */
    textSizeAdjust: 'none',
  },

  body: {
    lineHeight: 1.5,
    WebkitFontSmoothing: 'antialiased',
    /**
     * We have du duplicate this here, since the "*" selector will not be
     * applied to the body element, if a custom `selector` is used.
     */
    margin: 0,
  },
};

export const element = {
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  '*': {
    margin: 0,
  },

  a: {
    textDecoration: 'none',
  },

  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },

  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },

  button: {
    display: 'block',
    appearance: 'none',
    font: 'inherit',
    background: 'transparent',
    textAlign: 'center',
  },

  input: {
    display: 'block',
    appearance: 'none',
    font: 'inherit',
    '&::-ms-clear': {
      display: 'none',
    },
    '&::-webkit-search-cancel-button': {
      WebkitAppearance: 'none',
    },
  },

  select: {
    display: 'block',
    appearance: 'none',
    font: 'inherit',
    '&::-ms-expand': {
      display: 'none',
    },
  },

  textarea: {
    display: 'block',
    appearance: 'none',
    font: 'inherit',
  },
} as const;
