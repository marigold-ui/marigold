import { ThemeComponent, cva } from '@marigold/system';

export const LegacyTable: ThemeComponent<'LegacyTable'> = {
  table: cva([
    'w-full overflow-hidden rounded-lg bg-white/40 text-sm',
    'border-secondary-200 border-separate border-spacing-0 border',
  ]),
  thead: cva(),
  headerRow: cva(),
  header: cva('px-3 pb-2 pt-3 text-start'),
  body: cva(),
  row: cva([], {
    variants: {
      variant: {
        hover: 'hover:bg-neutral-100/80 ',
      },
    },
  }),
  cell: cva(['prose px-3 py-3.5 text-sm', 'border-secondary-200 border-t'], {
    variants: {
      variant: {
        colorTable: 'p-4 align-middle',
      },
    },
  }),
};
