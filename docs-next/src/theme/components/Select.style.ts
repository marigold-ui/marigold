import type { Theme } from '@marigold/components';

export const Select: Theme['components']['Select'] = {
  base: {
    button: {
      appearance: 'none',
      fontFamily: 'headline',
      width: '30%',
      borderColor: 'background.light',
      px: 'small-1',
      color: 'text.regular',
      lineHeight: 'large-2',

      bg: 'background.page',
      borderRadius: '10px',
      my: 'small-1',

      outline: 'none',
      cursor: 'pointer',

      '&:hover': {
        borderColor: 'brand.primary',
      },

      '&:focus-visible': { borderColor: 'brand.primary' },

      '&:expanded': {
        borderColor: 'brand.primary',
        color: 'brand.primary',
        borderRadius: '10px 10px 0px 0px',
      },
    },
  },
};
