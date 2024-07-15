import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('my-0 text-sm'),
  cell: cva('p-3 text-xs', {
    variants: {
      variant: {
        colorTable: 'p-4 align-middle',
      },
    },
  }),
  header: cva('border-b bg-white px-3 py-2 text-start'),
  row: cva('divide-y', {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/50 ',
      },
    },
  }),
};
