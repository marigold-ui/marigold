import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    display: 'flex',
    justifyContent: 'center',
    lineHeight: 'medium-1',
    fontFamily: 'body',
    border: 'none',

    '&:focus-visible': {
      outlineColor: 'brand.primary',
    },
  },
  variant: {
    outline: {
      background: 'transparent',
      borderStyle: 'solid',
      borderWidth: 'small-1',
      borderRadius: 'small-2',
      borderColor: 'background.light',

      '&:hover': {
        bg: 'hover.light',
      },
    },
    copy: {
      mb: 'medium-2',
      p: 'small-1',
      color: 'text.rgular',
      bg: 'transparent',
      fontSize: '15px',
      '&:focus': {
        outline: 'none',
      },
    },
    navigationSmall: {
      border: 'none',
      outline: 'none',
    },
    scrollToTop: {
      width: '100%',
      height: '100%',
    },
  },
  size: {
    full: {
      width: '100%',
    },
  },
};
