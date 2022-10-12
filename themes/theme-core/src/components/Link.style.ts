import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    color: '#900',
    '&:hover, &:visited': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    '&:disabled': {
      cursor: 'disabled',
    },
  },
  variant: {
    menuItemLink: {
      color: 'text',
      textDecoration: 'none',
    },
    cardText: {
      color: 'text',
      fontWeight: 'bold',
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
};
