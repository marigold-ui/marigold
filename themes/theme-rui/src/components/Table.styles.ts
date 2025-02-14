import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('text-sm'),
  row: cva(
    [
      'border-b border-border transition-colors',
      // does this selected think work?
      'data-[state=selected]:bg-muted hover:bg-transparent',
    ],
    {
      variants: {
        variant: {},
      },
    }
  ),
  header: cva(
    [
      'h-12 px-3 text-left align-middle font-medium text-muted-foreground',
      // does this checkbox think work?
      '[&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pr-0',
    ],
    {
      variants: {
        variant: {},
      },
    }
  ),
  cell: cva('', {
    variants: {
      variant: {},
    },
  }),
};
