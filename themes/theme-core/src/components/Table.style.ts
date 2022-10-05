import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {
    table: { borderCollapse: 'collapse' },
    header: {
      py: 'xxsmall',
      px: 'xsmall',
      cursor: 'default',
      color: 'gray00',
      bg: '#a9a9a9',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: 'gray00',
      ':nth-child(odd)': {
        bg: 'gray50',
      },
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    row: {
      '&:checked': {
        bg: 'orange10',
      },
      '&[data-hover]': {
        bg: 'gray20',
      },
      '&:focus-visible': {
        outlineColor: 'orange60',
      },
    },
    cell: {
      p: 'xsmall',
      color: 'text',
      borderBottom: '1px solid',
      borderColor: 'gray50',
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
  },
  variant: {
    tableLines: {
      header: {
        bg: 'none',
        color: 'text',
        fontWeight: '400',
        borderBottom: '1px solid',
        borderColor: '#cfcfcf',
        textAlign: 'left',
      },
      cell: {
        borderColor: '#cfcfcf',
      },
    },
    tableBorder: {
      header: {
        bg: 'none',
        color: 'text',
        fontWeight: '400',
        border: '1px solid',
        borderColor: '#cfcfcf',
        textAlign: 'left',
      },
      cell: {
        border: '1px solid #cfcfcf',
      },
    },
  },
};
