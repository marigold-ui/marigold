import type { Theme } from '@marigold/components';

export const Menu: Theme['components']['Menu'] = {
  base: {
    container: {
      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',

      height: '25vh',
      overflow: 'hidden auto',
    },
    item: {
      fontSize: 'xxsmall',
      px: 'xxsmall',
      py: 'xxsmall',
      cursor: 'pointer',

      '&:hover': {
        color: 'gray00',
        bg: 'blue60',
      },
    },
  },
};
