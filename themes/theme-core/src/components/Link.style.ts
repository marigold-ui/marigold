import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    color: '#900',
    '&:hover, &:visited': {
      textDecoration: 'none',
      cursor: 'pointer',
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
