import { ThemeComponent, cva } from '@marigold/system';

export const TableView: ThemeComponent<'TableView'> = {
  table: cva(['text-sm'], {
    variants: {
      variant: {
        default: '',
        grid: 'border-hidden',
        muted: '',
      },
      size: {
        compact:
          '[--cell-y-padding:calc(var(--spacing)*1)] [--cell-x-padding:calc(var(--spacing)*2)]',
        default:
          '[--cell-y-padding:calc(var(--spacing)*2.5)] [--cell-x-padding:calc(var(--spacing)*2.5)]',
        spacious:
          '[--cell-y-padding:calc(var(--spacing)*4)] [--cell-x-padding:calc(var(--spacing)*4)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  row: cva(
    [
      'border-border not-last:border-b',
      'transition-[background-color]',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
      'disabled:cursor-not-allowed',

      'data-selection-mode:cursor-pointer data-selection-mode:hover:bg-muted',
    ],
    {
      variants: {
        variant: {
          default: '',
          grid: '**:not-last:[[role=gridcell]]:border-r **:not-last:[[role=gridcell]]:border-border',
          admin: ['bg-access-admin'],
          master: ['bg-access-master'],
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),

  // <thead>
  head: cva([
    // for sticky header
    'bg-background/90 top-0 z-1',
    'border-border border-b',
  ]),
  column: cva(
    [
      'h-10 px-(--cell-x-padding) align-middle',
      'font-medium text-muted-foreground',
      'has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring',
    ],
    {
      variants: {
        variant: {
          default: '',
          grid: 'not-last:border-r border-border',
          muted: 'bg-muted border-t border-border',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),

  // <tbody>
  body: cva(['bg-background']),
  cell: cva([
    'px-(--cell-x-padding) py-(--cell-y-padding)',
    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
  ]),
};
