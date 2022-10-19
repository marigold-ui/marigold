import type { Theme } from '@marigold/components';

export const Dialog: Theme['components']['Dialog'] = {
  base: {
    container: {
      borderRadius: '2px',
      pl: 'large',
      pr: 'large',
      pb: 'large',
      pt: 'small',
      bg: '#ecebe6',
    },
    closeButton: {
      position: 'relative',
      right: '-24px',
      top: '-8px',
      bg: 'primary',
      border: '1px solid ',
      borderColor: 'primary',
      borderRadius: 'small',
      color: '#FFF',
      '&:hover': {
        bg: 'none',
      },
    },
  },
};
