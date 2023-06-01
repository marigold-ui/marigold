import type { Theme } from '@marigold/components';

export const Menu: Theme['components']['Menu'] = {
  base: {
    container: {
      fontFamily: 'headline',
      bg: 'background.page',
      border: '1px solid',
      borderColor: 'background.light',
      borderRadius: 'small-2',
      maxHeight: ['75vh', '75vh', '45vh'],
      overflow: 'hidden auto',
    },
    item: {
      p: 'small-1',
      cursor: 'pointer',
      '&:hover': {
        color: 'brand.primary',
      },
    },
  },
};
