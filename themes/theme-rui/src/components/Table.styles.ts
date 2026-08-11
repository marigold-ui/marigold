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
      // The whitespace the ghost button already carries around its 16px caret.
      // The track overlaps it instead of adding padding of its own, so the
      // caret lines up with the column's values and still gets 32px to hit.
      '[--tree-caret-inset:calc((var(--tree-chevron-size)-var(--spacing)*4)/2)]',
      // Caret box plus the button's own trailing whitespace — the distance from
      // where a row's content starts to where its value starts.
      '[--tree-gutter:calc(var(--tree-chevron-size)-var(--tree-caret-inset))]',
      // One level in is one gutter in, so a child's caret starts where its
      // parent's value does. A smaller step would put it between the parent's
      // caret and value, which reads as a misalignment rather than depth.
      '[--tree-indent:var(--tree-gutter)]',
      // Levels up to here share the gutter's x instead of indenting. Only the
      // root does: a root row with no children must not read as the previous
      // group's last child.
      '[--tree-indent-skip:1]',
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
      // A fixed leading track, so a group row and a childless row at the same
      // level still put their value at the same x. The track holds its width
      // with no control in it, so leaf rows need no spacer. The control is
      // wider than the track and hangs into the cell's edge padding — see
      // `--tree-caret-inset`.
      'grid grid-cols-[var(--tree-gutter)_1fr] items-center',
      // Indents past `--tree-indent-skip`, i.e. everything below the root, so
      // depth is visible. `--table-row-level` is React Aria's, and starts at 1;
      // the header cell has none, which is what leaves it at the root's x.
      'ps-[calc(max(var(--table-row-level,1)-var(--tree-indent-skip),0)*var(--tree-indent))]',
      '[[data-has-child-items]_&]:font-semibold',
    ],
  }),
  expandButton: cva({
    base: [
      // Ghost icon button. The wash is `bg-current/10`, so it blends on any
      // ground including the group row's own fill.
      'ui-button-base col-start-1',
      // Keeps the 32px target while the caret itself sits where the column's
      // values do, so its margin box still measures exactly one track.
      'size-(--tree-chevron-size) -ms-(--tree-caret-inset)',
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
      // Starts where the drop target's own level puts its text, so a drop inside
      // an expanded group reads as landing in that group rather than at the
      // root, which spans the full row. The edge padding and gutter are added
      // once for anything below the root, then the per-level indent.
      //
      // `--drop-level` is the collection's level, which is 0-based — unlike
      // `--table-row-level`. Hence the `+1` before comparing against
      // `--tree-indent-skip`, so both indents stay driven by that one token.
      // Unset (a flat table) resolves to 0.
      '[--drop-indent:calc(clamp(0,var(--drop-level,0),1)*(var(--cell-edge-padding)+var(--tree-gutter))+max(var(--drop-level,0)+1-var(--tree-indent-skip),0)*var(--tree-indent))]',
      'before:absolute before:top-0 before:end-0 before:start-(--drop-indent)',
      'before:h-0.5 before:-translate-y-1/2 before:bg-border',
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
