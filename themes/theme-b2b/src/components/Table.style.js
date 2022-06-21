export const Table = {
  base: {
    table: { borderCollapse: 'collapse', fontSize: 'xxsmall' },
    header: {
      py: 'xxsmall',
      px: 'small',
      cursor: 'default',
      color: 'gray00',
      bg: 'gray50',
      textAlign: 'left',
      '&:nth-of-type(even)': { bg: 'gray60' },
      '&:focus': {
        outlineColor: 'orange60',
      },
    },
    row: {
      '&:checked': {
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
      py: 'xxsmall',
      px: 'small',
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
