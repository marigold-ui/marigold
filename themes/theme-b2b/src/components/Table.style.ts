import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {
    table: { borderCollapse: 'collapse', fontSize: 'xxsmall' },
    header: {
      py: 'small',
      px: 'small',
      cursor: 'default',
      color: 'gray70',
      textAlign: 'left',
      borderBottom: '1px solid',
      borderColor: 'gray50',

      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    row: {
      '&:selected': {
        bg: 'orange10',
      },
      '&:hover': {
        bg: 'gray30',
      },
      '&:focus-visible': {
        outlineColor: 'orange60',
      },
    },
    cell: {
      py: 'small',
      px: 'small',
      cursor: 'default',
      color: 'gray70',
      borderBottom: '1px solid',
      borderColor: 'gray50',
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
  },
  variant: {
    compact: {
      header: {
        py: 'xsmall',
      },
      cell: {
        py: 'xsmall',
      },
    },
    expanded: {
      header: {
        py: 'medium',
      },
      cell: {
        py: 'medium',
      },
    },
  },
};
