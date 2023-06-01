import type { Theme } from '@marigold/components';

export const Input: Theme['components']['Input'] = {
  base: {
    input: {
      border: '1px solid',
      borderColor: '#aaa',
      borderRadius: 'small',
      lineHeight: 'medium',
      pl: 'xsmall',
      pr: 'xsmall',

      '&:has-icon': {
        pl: 'large',
      },
    },
    icon: {
      left: 'xxsmall',
    },
  },
};
