import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {},
  variant: {
    propsTable: {
      table: { fontSize: 'small-1' },
      header: {
        fontFamily: 'headline',
        textAlign: 'left',
        p: 'medium-1',
        borderBottom: '1px solid',
        borderColor: 'background.light',
      },
      cell: {
        p: 'medium-1',
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
