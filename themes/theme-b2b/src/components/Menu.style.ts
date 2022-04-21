import type { Theme } from '@marigold/components';

export const Menu: Theme['components']['Menu'] = {
  base: {
    menu: {
      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',
    },
    item: {
      px: 'small',
      py: 'xxsmall',
      cursor: 'pointer',

      '&:focus': {
        bg: 'gray20',
      },
    },
  },
};
