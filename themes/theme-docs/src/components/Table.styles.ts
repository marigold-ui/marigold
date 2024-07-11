import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('table w-full text-sm'),
  cell: cva(' mt-4  px-4 py-2 text-xs', {
    variants: {
      variant: {
        colorTable: 'p-4 align-middle',
      },
    },
  }),
  header: cva('border-b bg-white px-4 py-2 text-start'),
  row: cva('border-b', {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/50 ',
      },
    },
  }),
};
