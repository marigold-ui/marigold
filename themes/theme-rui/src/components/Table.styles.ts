import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva({
    base: [
      'text-sm bg-surface',
      // Edge padding: Panel's `--panel-px`, then a bled container's
      // `--bleed-px`, then the standalone cell default.
      '[--cell-edge-padding:var(--panel-px,var(--bleed-px,var(--cell-x-padding)))]',
      // 32px, not the 24px WCAG 2.2 SC 2.5.8 floor: hit repeatedly, and still
      // fits `compact` (45px row).
      '[--tree-chevron-size:calc(var(--spacing)*8)]',
      // Levels up to here share the gutter's x instead of indenting.
      '[--tree-indent-skip:2]',
    ],
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
          '[--tree-indent:calc(var(--spacing)*5)]',
        ],
        default: [
          '[--cell-y-padding:calc(var(--spacing)*2.5)]',
          '[--cell-x-padding:calc(var(--spacing)*2.5)]',
          '[--header-height:calc(var(--spacing)*10)]',
          '[--tree-indent:calc(var(--spacing)*6)]',
        ],
        spacious: [
          '[--cell-y-padding:calc(var(--spacing)*4)]',
          '[--cell-x-padding:calc(var(--spacing)*4)]',
          '[--header-height:calc(var(--spacing)*12)]',
          '[--tree-indent:calc(var(--spacing)*7)]',
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
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50',
      'disabled:cursor-not-allowed',
      'data-hovered:cursor-pointer data-hovered:ui-state-hover',
      'dragging:opacity-50 dragging:transform-gpu',
      // Fills a group row whether open or closed, so the row kind survives
      // greyscale and print where font weight alone would not. `not-hovered` is
      // explicit because Tailwind's emit order, not this array's, picks the
      // winning background.
      'data-has-child-items:not-data-hovered:bg-foreground/5',
    ],
    variants: {
      variant: {
        default: '',
        grid: [
          '**:not-last:[[role=rowheader]]:border-r **:not-last:[[role=rowheader]]:border-border',
          '**:not-last:[[role=gridcell]]:border-r **:not-last:[[role=gridcell]]:border-border',
        ],
        admin: [
          'bg-access-admin border-access-admin-accent!',
          '*:border-t *:border-access-admin-accent',
        ],
        master: [
          'bg-access-master border-access-master-accent!',
          '*:border-t *:border-access-master-accent',
        ],
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
      'first:ps-(--cell-edge-padding) last:pe-(--cell-edge-padding)',
      'font-medium text-secondary',
      'not-has-[[type=checkbox]]:has-focus-visible:outline-2 not-has-[[type=checkbox]]:has-focus-visible:-outline-offset-2 not-has-[[type=checkbox]]:has-focus-visible:outline-ring/50',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50', // This one is for the empty dragging header column
      'aria-[sort]:hover:ui-state-hover aria-[sort]:hover:cursor-pointer',
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
  body: cva({}),

  // <tfoot>
  footer: cva({
    base: [
      'bg-surface/90 border-border border-t',
      '**:[[role=gridcell]]:font-semibold **:[[role=rowheader]]:font-semibold',
    ],
  }),

  cell: cva({
    base: [
      'px-(--cell-x-padding) py-(--cell-y-padding)',
      'first:ps-(--cell-edge-padding) last:pe-(--cell-edge-padding)',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring/50',
      'has-[[data-cell-content]:focus-visible]:outline-2 has-[[data-cell-content]:focus-visible]:-outline-offset-2 has-[[data-cell-content]:focus-visible]:outline-ring/50',
      '**:data-cell-content:outline-none',
      'data-editable:hover:ui-state-hover',
      'data-editable:has-[:focus-visible]:ui-state-hover',
    ],
  }),

  // Expandable rows (tree grid)
  //
  // Indent lives here rather than on the cell's padding, so it composes with
  // `--cell-edge-padding` instead of colliding with it on the same property.
  treeIndent: cva({
    base: [
      // A fixed leading track, so a group row, its children and a root-level row
      // all put their value at the same x — the column stays scannable, which is
      // the point of the feature. The track holds its width with no control in
      // it, so leaf rows need no spacer.
      'grid grid-cols-[var(--tree-chevron-size)_1fr] items-center gap-2',
      // Indents only past `--tree-indent-skip`, so an unsupported depth degrades
      // instead of flattening. `--table-row-level` is React Aria's, and starts at 1.
      'ps-[calc(max(var(--table-row-level,1)-var(--tree-indent-skip),0)*var(--tree-indent))]',
      '[[data-has-child-items]_&]:font-semibold',
    ],
  }),
  expandButton: cva({
    base: [
      // Ghost icon button. The wash is `bg-current/10`, so it blends on any
      // ground including the group row's own fill.
      'ui-button-base col-start-1',
      'size-(--tree-chevron-size)',
      'text-secondary',
      'hover:ui-state-hover-ghost',
      'ui-press',
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
      'drop-target:before:bg-primary',
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
      'size-control aspect-square rounded-surface transition-[color,transform]',
      'ui-interactive',
      'ui-press',
      'hover:ui-state-hover-ghost',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5',
    ],
  }),
  editCancel: cva({
    base: [
      'inline-flex items-center justify-center',
      'sm:text-secondary font-medium',
      'text-sm h-control-small sm:size-control sm:aspect-square rounded-surface transition-[color,transform]',
      'cursor-pointer',
      'ml-1.5', // some extra spacing between buttons and field
      'focus-visible:ui-state-focus outline-none',
      'ui-press',
      'hover:ui-state-hover-ghost',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5',
    ],
  }),
  editSave: cva({
    base: [
      'inline-flex items-center justify-center',
      'sm:text-secondary font-medium',
      'text-sm h-control-small sm:size-control sm:aspect-square rounded-surface transition-[color,transform]',
      'cursor-pointer',
      'focus-visible:ui-state-focus outline-none',
      'ui-press',
      'hover:ui-state-hover-ghost',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4.5',
    ],
  }),
};
