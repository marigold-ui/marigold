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
        compact: [
          '[--cell-y-padding:calc(var(--spacing)*1.5)]',
          '[--cell-x-padding:calc(var(--spacing)*2)]',
          '[--header-height:calc(var(--spacing)*8)]',
        ],
        default: [
          '[--cell-y-padding:calc(var(--spacing)*2.5)]',
          '[--cell-x-padding:calc(var(--spacing)*2.5)]',
          '[--header-height:calc(var(--spacing)*10)]',
        ],
        spacious: [
          '[--cell-y-padding:calc(var(--spacing)*4)]',
          '[--cell-x-padding:calc(var(--spacing)*4)]',
          '[--header-height:calc(var(--spacing)*12)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  row: cva(
    [
      'bg-background',
      'border-border not-last:border-b',
      'transition-[background-color]',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
      'disabled:cursor-not-allowed',

      'data-selection-mode:cursor-pointer data-selection-mode:hover:bg-muted',

      'dragging:opacity-50 dragging:transform-gpu',
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
    'bg-background/90 z-1',
    'border-border border-b',
  ]),
  column: cva(
    [
      'h-(--header-height) px-(--cell-x-padding) align-middle',
      'font-medium text-muted-foreground',
      'has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-ring',
      'aria-[sort]:hover:bg-muted aria-[sort]:hover:cursor-pointer aria-[sort]:hover:text-foreground',
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

  // Drag and drop
  dragHandle: cva(['text-muted-foreground cursor-grab', '[&_svg]:size-4']),
  dropIndicator: cva(['outline-1 outline-stone-800']),
};
