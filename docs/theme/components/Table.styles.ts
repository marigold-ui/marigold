import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('w-full overflow-auto  text-sm'),
  cell: cva(' mt-4 hyphens-auto px-1 py-2 text-sm', {
    variants: {
      variant: {
        colorTable: 'p-4 align-middle',
      },
    },
  }),
  header: cva('border-b px-1 py-2 text-start'),
  row: cva('hover:bg-bg-hover/50 border-b'),
};
