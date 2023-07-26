import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('table w-full text-sm'),
  cell: cva(' mt-4 hyphens-auto px-4 py-2 text-sm'),
  header: cva('border-b px-4 py-2 text-start'),
  row: cva('hover:bg-bg-hover/50 border-b'),
};
