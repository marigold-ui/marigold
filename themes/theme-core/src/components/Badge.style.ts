import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    borderRadius: 'large',
    border: '2px solid transparent',
    whiteSpace: 'nowrap',
    padding: '0.25rem 0.75rem',
    mx: '0.5rem',
  },
};
