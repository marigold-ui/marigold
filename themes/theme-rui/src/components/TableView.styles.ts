import { ThemeComponent, cva } from '@marigold/system';

export const TableView: ThemeComponent<'TableView'> = {
  table: cva(['text-sm w-full']),
  row: cva(['border-border border-b']),

  // <thead>
  head: cva(
    [
      // for sticky header
      'bg-background/90 top-0 z-1 backdrop-blur-xs',
      'border-border border-b',
    ],
    {
      variants: {
        variant: {
          default: '',
          grid: 'not-last:[&_[role=columnheader]]:border-r not-last:[&_[role=columnheader]]:border-border',
          muted: 'bg-muted',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  column: cva([
    'h-12 px-2.5 align-middle font-medium text-muted-foreground',
    'has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring',
  ]),

  // <tbody>
  body: cva(),
  cell: cva(),
};
