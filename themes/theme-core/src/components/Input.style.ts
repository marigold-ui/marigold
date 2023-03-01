import type { Theme } from '@marigold/components';

export const Input: Theme['components']['Input'] = {
  base: {
    container: {
      border: '1px solid',
      borderColor: '#aaa',
      borderRadius: 'small',
      lineHeight: 'medium',
    },
    icon: {
      left: 'xxsmall',
    },
    input: {
      pl: 'xsmall',
      pr: 'xsmall',

      '&:has-icon': {
        pl: 'large',
      },
    },
  },
};
