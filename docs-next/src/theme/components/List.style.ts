import type { Theme } from '@marigold/components';

export const List: Theme['components']['List'] = {
  base: {
    ul: {
      mb: 'medium-1',
    },
    ol: {
      mb: 'medium-1',
    },
    item: {
      lineHeight: 'large-1',
    },
  },
  variant: {
    toc: {
      ul: {
        listStyle: 'none',
      },
      item: {
        fontSize: 14,
        fontFamily: 'headline',
      },
    },
  },
};
