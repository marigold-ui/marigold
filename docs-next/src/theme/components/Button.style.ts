import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    display: 'inline-flex',
    textAlign: 'center',
    lineHeight: 'medium-1',
    fontFamily: 'body',
    border: 'none',
  },
  variant: {
    outline: {
      background: 'transparent',
      borderStyle: 'solid',
      borderWidth: 'small-1',
      borderRadius: 'small-2',
      borderColor: 'background.light',

      '&:hover': {
        bg: 'background.light',
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
  },
  size: {
    large: {
      p: 'medium-1',
    },
  },
};
