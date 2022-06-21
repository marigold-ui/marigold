export const Table = {
  base: {
    table: { borderCollapse: 'collapse' },
    header: {
      py: 'xxsmall',
      px: 'xsmall',
      cursor: 'default',
      color: 'gray00',
      bg: 'gray50',
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    row: {
      '&:checked': {
        bg: 'orange10',
      },
      '&:hover': {
        bg: 'gray20',
      },
      '&:focus-visible': {
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
//# sourceMappingURL=Table.style.js.map
