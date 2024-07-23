import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva([
    ' my-0 w-full rounded-lg text-sm',
    'border-secondary-300 border-separate border-spacing-0 border',
  ]),
  header: cva('p-2 text-start'),
  row: cva([], {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/50 ',
      },
    },
  }),
  cell: cva(
    ['text-text-primary px-2 py-3.5 text-xs', 'border-secondary-300 border-t'],
    {
      variants: {
        variant: {
          colorTable: 'p-4 align-middle',
        },
      },
    }
  ),
};
