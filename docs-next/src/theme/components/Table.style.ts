import type { Theme } from '@marigold/components';

export const Table: Theme['components']['Table'] = {
  base: {},
  variant: {
    propsTable: {
      table: { fontSize: 'small-1' },
      header: {
        fontFamily: 'headline',
        textAlign: 'left',
        p: 'small-1',
        borderBottom: '1px solid',
        borderColor: 'brand.text',
      },
      cell: {
        fontFamily: 'mono',
        p: 'small-1',
        borderBottom: '1px solid',
        borderColor: 'brand.text',
        color: 'brand.secondary',
        '&:last-child': { fontFamily: 'headline', color: 'brand.text' },
      },
    },
  },
} as const;
