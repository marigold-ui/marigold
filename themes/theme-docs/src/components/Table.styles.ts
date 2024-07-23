import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('my-0 rounded border text-sm'),
  cell: cva('text-text-primary px-2 py-3.5 text-xs', {
    variants: {
      variant: {
        colorTable: 'p-4 align-middle',
      },
    },
  }),
  header: cva('p-2 text-start'),
  row: cva('', {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/50 ',
      },
    },
  }),
};
