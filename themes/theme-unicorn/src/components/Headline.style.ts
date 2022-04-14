import type { Theme } from '@marigold/components';

export const Headline: Theme['components']['Headline'] = {
  base: {
    m: 'none',
    fontWeight: 'heading',
  },
  size: {
    'level-1': {
      fontSize: 'xlarge',
      marginBottom: 'medium',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    'level-2': {
      fontSize: 'large',
      marginTop: 'medium',
      marginBottom: 'xsmall',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    'level-3': {
      fontSize: 'medium',
      marginTop: 'small',
      marginBottom: 'small',
      '&:first-child': {
        marginTop: 'none',
      },
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
