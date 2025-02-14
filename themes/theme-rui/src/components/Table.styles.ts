import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva(''),
  header: cva('', {
    variants: {
      variant: {},
    },
  }),
  row: cva('', {
    variants: {
      variant: {},
    },
  }),
  cell: cva('', {
    variants: {
      variant: {},
    },
  }),
};
