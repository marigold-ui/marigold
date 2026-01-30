import { ThemeComponent, cva } from '@marigold/system';

export const TableView: ThemeComponent<'TableView'> = {
  table: cva(['text-sm bg-background'], {
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
      'not-has-[[type=checkbox]]:has-focus-visible:outline-2 not-has-[[type=checkbox]]:has-focus-visible:-outline-offset-2 not-has-[[type=checkbox]]:has-focus-visible:outline-ring',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring', // This one is for the empty dragging header column
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
    'focus:outline-2 focus:-outline-offset-2 focus:outline-ring',
  ]),

  // Drag and drop
  dragHandle: cva([
    'text-muted-foreground rounded size-4',
    '[&_svg]:size-4',
    'focus-visible:util-focus-ring outline-none',
  ]),
  dragPreview: cva([
    'px-4 py-3 bg-brand rounded-lg shadow-lg',
    'text-sm text-brand-foreground',
  ]),
  dragPreviewCounter: cva([
    'flex items-center justify-center rounded-full',
    'bg-brand-foreground px-2',
    'text-xs font-medium leading-normal text-brand',
  ]),
  dropIndicator: cva([
    'relative',
    'before:absolute before:inset-0 before:h-0.5 before:-translate-y-1/2 before:bg-stone-300',
    'drop-target:before:z-10 drop-target:before:bg-stone-800',
  ]),

  // Editable cell
  editablePopover: cva([
    'ui-surface ui-elevation-overlay',
    'flex items-start gap-2 px-2 py-1',
  ]),
};
