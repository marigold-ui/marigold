import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'fixed.medium-1',
    fontFamily: 'headline',
    textTransform: 'lowercase',
    borderRadius: 'medium-1',
    border: '2px solid transparent',
    whiteSpace: 'nowrap',
    py: 4,
    px: 12,
    mb: 16,
  },
  variant: {
    new: {
      color: 'text.regular',
      borderColor: 'green.50',
      bg: 'green.50',
    },
    updated: {
      color: 'text.regular',
      borderColor: 'blue.50',
      bg: 'blue.50',
    },
    beta: {
      color: 'text.regular',
      borderColor: 'yellow.50',
      bg: 'yellow.50',
    },
    deprecated: {
      color: 'text.regular',
      borderColor: 'red.50',
      bg: 'red.50',
    },
  },
  size: {
    small: {
      fontSize: '12px',
      mb: 0,
      py: 0,
      px: 4,
      ml: 16,
    },
  },
};
