import type { Theme } from '@marigold/components';

export const Menu: Theme['components']['Menu'] = {
  base: {
    container: {
      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',
      maxHeight: ['75vh', '75vh', '45vh'],
      overflow: 'hidden auto',
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
