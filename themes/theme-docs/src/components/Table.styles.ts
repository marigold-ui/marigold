import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva([
    ' my-0 w-full rounded-lg bg-white/40 text-sm',
    'border-secondary-200 border-separate border-spacing-0 border',
  ]),
  header: cva('px-3 pb-2 pt-3 text-start'),
  row: cva([], {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/80 ',
      },
    },
  }),
  cell: cva(
    ['text-text-primary px-3 py-3.5 text-xs', 'border-secondary-200 border-t'],
    {
      variants: {
        variant: {
          colorTable: 'p-4 align-middle',
        },
      },
    }
  ),
};
