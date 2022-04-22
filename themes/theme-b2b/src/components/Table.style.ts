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

      '&:nth-child(even)': { bg: 'gray60' },

      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    row: {
      '&:checked': {
        bg: 'orange10',
      },
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    cell: {
      p: 'xsmall',
      cursor: 'default',
      borderBottom: '1px solid',
      borderColor: 'gray50',
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
  },
};
