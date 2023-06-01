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
      '&:focus': {
        outlineColor: 'purple60',
      },
    },
    row: {
      '&:checked': {
        bg: 'purple10',
      },
      '&[data-hover]': {
        bg: 'gray30',
      },
      '&:focus-visible': {
        outlineColor: 'purple60',
      },
    },
    cell: {
      p: 'xsmall',
      borderBottom: '1px solid',
      borderColor: 'gray50',
      '&:focus': {
        outlineColor: 'purple60',
      },
    },
  },
};
