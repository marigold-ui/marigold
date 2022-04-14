import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    color: 'primary',
    '&:hover': {
      textDecoration: 'none',
    },
    '&disabled': {
      cursor: 'disabled',
    },
  },
  variant: {
    menuItemLink: {
      color: 'text',
      textDecoration: 'none',
    },
  },
};
