import type { Theme } from '@marigold/components';

export const Autocomplete: Theme['components']['Autocomplete'] = {
  base: {
    icon: {
      color: 'primary',
      height: 22,
      width: 22,
    },
    clear: {
      color: '#fff',
      background: 'primary',
      borderRadius: 'small',
      height: 20,
      width: 20,
    },
  },
};
