import type { Theme } from '@marigold/components';

export const Headline: Theme['components']['Headline'] = {
  base: {
    m: 'none',
    fontWeight: 'heading',
  },
  size: {
    'level-1': {
      fontSize: 'xlarge',
    },
    'level-2': {
      fontSize: 'large',
    },
    'level-3': {
      fontSize: 'medium',
    },
    'level-4': {
      fontSize: 'small',
    },
    'level-5': {
      fontSize: 'xsmall',
    },
    'level-6': {
      fontSize: 'xsmall',
      textTransform: 'uppercase',
    },
  },
};
