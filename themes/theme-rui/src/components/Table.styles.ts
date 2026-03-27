import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva({
    base: ['text-sm bg-surface'],
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

  row: cva({
    base: [
      'border-border not-last:border-b',
      'transition-[background-color]',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50',
      'disabled:cursor-not-allowed',
      'data-selection-mode:cursor-pointer data-selection-mode:hover:bg-hover',
      'dragging:opacity-50 dragging:transform-gpu',
    ],
    variants: {
      variant: {
        default: '',
        grid: [
          '**:not-last:[[role=rowheader]]:border-r **:not-last:[[role=rowheader]]:border-border',
          '**:not-last:[[role=gridcell]]:border-r **:not-last:[[role=gridcell]]:border-border',
        ],
        admin: ['bg-access-admin'],
        master: ['bg-access-master'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),

  // <thead>
  head: cva({
    base: [
      // for sticky header
      'bg-surface/90',
      'border-border border-b',
    ],
  }),
  column: cva({
    base: [
      'h-(--header-height) px-(--cell-x-padding) py-0 align-middle',
      'font-medium text-secondary',
      'not-has-[[type=checkbox]]:has-focus-visible:outline-2 not-has-[[type=checkbox]]:has-focus-visible:-outline-offset-2 not-has-[[type=checkbox]]:has-focus-visible:outline-ring/50',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50', // This one is for the empty dragging header column
      'aria-[sort]:hover:bg-hover aria-[sort]:hover:cursor-pointer aria-[sort]:hover:text-foreground',
    ],
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
  }),

  // <tbody>
  body: cva({ base: ['bg-surface'] }),
  cell: cva({
    base: [
      'px-(--cell-x-padding) py-(--cell-y-padding)',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50',
      'has-[[data-cell-content]:focus-visible]:outline-2 has-[[data-cell-content]:focus-visible]:-outline-offset-2 has-[[data-cell-content]:focus-visible]:outline-ring/50',
      '**:data-cell-content:outline-none',
    ],
  }),

  // Drag and drop
  dragHandle: cva({
    base: [
      'text-secondary rounded size-4',
      '[&_svg]:size-4',
      'focus-visible:ui-state-focus outline-none',
    ],
  }),
  dragPreview: cva({
    base: [
      'px-4 py-3 bg-primary rounded-lg shadow-elevation-overlay',
      'text-sm text-primary-foreground',
    ],
  }),
  dragPreviewCounter: cva({
    base: [
      'flex items-center justify-center rounded-full',
      'bg-primary-foreground px-2',
      'text-xs font-medium leading-normal text-primary',
    ],
  }),
  dropIndicator: cva({
    base: [
      'relative',
      'before:absolute before:inset-0 before:h-0.5 before:-translate-y-1/2 before:bg-border',
      'drop-target:before:z-10 drop-target:before:bg-primary',
    ],
  }),

  // Editable cell
  editablePopover: cva({
    base: [
      'ui-surface shadow-elevation-overlay',
      'flex items-start justify-center gap-1 pl-1 pr-1 py-1',
    ],
  }),
  editTrigger: cva({
    base: [
      'flex items-center justify-center',
      'text-secondary',
      'size-control aspect-square rounded-surface transition-[color,background,transform]',
      'ui-interactive',
      'ui-press',
      'hover:bg-current/10',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5',
    ],
  }),
  editCancel: cva({
    base: [
      'inline-flex items-center justify-center',
      'sm:text-secondary font-medium',
      'text-sm h-control-small sm:size-control sm:aspect-square rounded-surface transition-[color,background,transform]',
      'cursor-pointer',
      'ml-1.5', // some extra spacing between buttons and field
      'focus-visible:ui-state-focus outline-none',
      'ui-press',
      'hover:bg-current/10',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5',
    ],
  }),
  editSave: cva({
    base: [
      'inline-flex items-center justify-center',
      'sm:text-secondary font-medium',
      'text-sm h-control-small sm:size-control sm:aspect-square rounded-surface transition-[color,background,transform]',
      'cursor-pointer',
      'focus-visible:ui-state-focus outline-none',
      'ui-press',
      'hover:bg-current/10',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4.5',
    ],
  }),
};
