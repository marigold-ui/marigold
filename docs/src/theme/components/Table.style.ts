import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {
    table: { fontSize: 'fixed.small-3' },
    header: {
      fontFamily: 'headline',
      textAlign: 'left',
      p: 'small-1',
    },
    cell: {
      p: 'small-1',
    },
  },
  variant: {
    lines: {
      cell: {
        borderTop: '1px solid',
        borderColor: 'background.light',
        whiteSpace: 'initial',
        verticalAlign: 'top',
      },
    },
    propsTable: {
      header: {
        borderBottom: '1px solid',
        borderColor: 'background.light',
      },
      cell: {
        borderBottom: '1px solid',
        borderColor: 'background.light',
        color: 'brand.secondary',
        '&:last-child': {
          fontFamily: 'headline',
          color: 'text.regular',
          hyphens: 'auto',
        },
      },
    },
  },
} as const;
