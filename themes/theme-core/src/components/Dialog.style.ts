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
      height: 24,
      width: 24,
      right: '-24px',
      top: '-8px',
      backgroundColor: 'primary',
      border: '1px solid ',
      borderColor: 'primary',
      borderRadius: 'small',
      color: '#FFF',
    },
  },
  size: {
    medium: {
      container: {
        width: '600px',
      },
    },
  },
};
