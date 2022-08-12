import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      bg: 'background.page',
      outline: 'none',
      border: '1px solid',
      borderColor: 'brand.primary',
      borderRadius: '0px 0px 10px 10px ',
    },

    list: {
      outline: 'none',
    },

    option: {
      p: 'small-1',
      fontFamily: 'headline',

      borderRadius: '10px',
      outline: 'none',
      cursor: 'pointer',

      '&:focus': {
        color: 'brand.primary',
      },
    },
    section: {
      outline: 'none',
    },
  },
};
