import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'fixed.small-2',
    fontFamily: 'headline',
    textTransform: 'lowercase',
    borderRadius: 'medium-1',
    whiteSpace: 'nowrap',
    py: 'none',
    px: 'small-1',
  },
  variant: {
    new: {
      color: 'success.background',
      bg: 'success.text',
    },
    updated: {
      color: 'info.background',
      bg: 'info.text',
    },
    beta: {
      color: 'warning.background',
      bg: 'warning.text',
    },
    deprecated: {
      color: 'error.background',
      bg: 'error.text',
    },
  },
};
