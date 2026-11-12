import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva({
    base: [
      'text-sm bg-surface',
      // Only a bled container publishes `--bleed-px`, so edge cells align with
      // its title there and keep the plain cell padding everywhere else. Never
      // read `--panel-px`: Panel sets it on its root, where it inherits into
      // non-bled content too and would offset those cells twice.
      '[--cell-edge-padding:var(--bleed-px,var(--cell-x-padding))]',
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
      // The ring is drawn by the cells, see `cell`.
      'outline-none',
      'disabled:cursor-not-allowed',
      'data-hovered:cursor-pointer data-hovered:ui-state-hover',
      'dragging:opacity-50 dragging:transform-gpu',
      // Opaque in every state, so a sticky cell can inherit it and hide what
      // scrolls underneath. Body rows only: the footer keeps its translucency.
      'in-[tbody]:bg-surface',
      // The children carry the group, not the parent: a band across the whole
      // row says what belongs to what even in the leading drag and selection
      // columns, which don't indent. `:not([data-hovered])` is explicit because
      // Tailwind's emit order, not this array's, picks the winning background.
      // Mixed onto the surface rather than translucent, see above.
      '[&[data-level]:not([data-level="1"]):not([data-hovered])]:bg-[color-mix(in_oklab,var(--color-foreground)_8%,var(--color-surface))]',
    ],
    variants: {
      variant: {
        default: '',
        grid: [
          '**:not-last:[[role=rowheader]]:border-r **:not-last:[[role=rowheader]]:border-border',
          '**:not-last:[[role=gridcell]]:border-r **:not-last:[[role=gridcell]]:border-border',
        ],
        // `!` on the background for the same reason it is on the border: who
        // may see a row outranks where it sits in the tree, so the access mark
        // has to survive the nesting band.
        admin: [
          'bg-access-admin! border-access-admin-accent!',
          '*:border-t *:border-access-admin-accent',
        ],
        master: [
          'bg-access-master! border-access-master-accent!',
          '*:border-t *:border-access-master-accent',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),

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
      'ui-sticky-edge',
    ],
    variants: {
      variant: {
        // Sticky header cells cover what scrolls under them. `muted` already does.
        default: 'data-sticky:bg-surface',
        grid: 'not-last:border-r border-border data-sticky:bg-surface',
        muted: 'bg-muted border-t border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),

  body: cva({}),

  footer: cva({
    base: [
      'bg-surface/90 border-border border-t',
      '**:[[role=gridcell]]:font-semibold **:[[role=rowheader]]:font-semibold',
      // Footer rows have no background of their own to inherit, see `row`.
      // `!` because it competes with the cell's own rule at equal specificity.
      '**:data-sticky:bg-surface!',
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
      // Covers what scrolls underneath with whatever its row shows.
      'data-sticky:bg-inherit',
      // A focused row's ring, drawn by its cells rather than as the row's
      // outline: sticky cells sit above the row and would cover an outline.
      'group-focus-visible/row:not-data-sticky:relative',
      'group-focus-visible/row:before:absolute group-focus-visible/row:before:inset-0 group-focus-visible/row:before:pointer-events-none group-focus-visible/row:before:border-y-2 group-focus-visible/row:before:border-ring/50',
      'first:group-focus-visible/row:before:border-s-2 last:group-focus-visible/row:before:border-e-2',
      'ui-sticky-edge',
    ],
  }),

  // Indent lives here rather than on the cell's padding, so it composes with
  // `--cell-edge-padding` instead of colliding with it on the same property.
  treeIndent: cva({
    base: [
      // A fixed leading track, so a group row and a childless row at the same level
      // put their value at the same x, and leaf rows need no spacer. The control is
      // wider than the track and hangs into the cell's edge padding.
      'grid grid-cols-[var(--tree-gutter)_1fr] items-center',
      // Indents past `--tree-indent-skip`, i.e. everything below the root, so
      // depth is visible. `--table-row-level` is React Aria's, and starts at 1;
      // the header cell has none, which is what leaves it at the root's x.
      '[--tree-level-indent:calc(max(var(--table-row-level,1)-var(--tree-indent-skip),0)*var(--tree-indent))]',
      'ps-(--tree-level-indent)',
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
      // Same trick vertically: the target is taller than the line it sits on,
      // and without this it would set the row's height, making group rows
      // taller than leaf rows. Cell padding stays the only thing that does.
      'my-[calc((var(--tree-chevron-size)-1lh)/-2)]',
      'text-secondary',
      'hover:ui-state-hover-ghost',
      'ui-press',
    ],
  }),

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
      // Starts where the drop target's own level puts its text, so a drop in an
      // expanded group reads as landing there rather than at the root. Note
      // `--drop-level` is 0-based, unlike `--table-row-level`, hence the `+1`
      // before comparing against `--tree-indent-skip`. Unset resolves to 0.
      '[--drop-indent:calc(clamp(0,var(--drop-level,0),1)*(var(--cell-edge-padding)+var(--tree-gutter))+max(var(--drop-level,0)+1-var(--tree-indent-skip),0)*var(--tree-indent))]',
      'before:absolute before:top-0 before:end-0 before:start-(--drop-indent)',
      'before:h-0.5 before:-translate-y-1/2 before:bg-border',
      'drop-target:before:bg-primary',
    ],
  }),

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
  // The room around the ActionBar slides with it instead of jumping.
  actionBarSpacer: cva({
    base: 'motion-safe:transition-[height] motion-safe:duration-200',
  }),
};
