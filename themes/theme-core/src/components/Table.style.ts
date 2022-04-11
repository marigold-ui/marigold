import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {
    table: { borderCollapse: 'collapse' },
    header: {
      py: 'xxsmall',
      px: 'xsmall',
      cursor: 'default',
      color: 'gray00',
      bg: 'gray50',
    },
    row: { bg: 'orange10' },
    cell: {
      p: 'xsmall',
      cursor: 'default',
      borderBottom: '1px solid',
      borderColor: 'gray50',
    },
  },
};
