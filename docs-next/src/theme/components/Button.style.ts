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
  },
};
