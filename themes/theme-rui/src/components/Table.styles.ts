import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva({
    base: [
      'text-sm bg-surface',
      // Edge padding: Panel's `--panel-px`, then a bled container's
      // `--bleed-px`, then the standalone cell default.
      '[--cell-edge-padding:var(--panel-px,var(--bleed-px,var(--cell-x-padding)))]',
      // Footprint of the expand control in the tree column. Leaf rows reserve
      // the same width, so values stay aligned down the column.
      //
      // 32px rather than the 24px WCAG 2.2 SC 2.5.8 sets as the floor: this is a
      // control people hit repeatedly. It fits every density — at `compact` the
      // row is 45px, leaving 13px of slack.
      '[--tree-chevron-size:calc(var(--spacing)*8)]',
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
      // A row that heads a group wears the structural band, so the two row kinds
      // are told apart by fill rather than by font weight alone — which survives
      // greyscale, low vision and print. Marks the row *kind*, not the expansion
      // state, so a collapsed group is banded too: that is what lets you see
      // there is something to open before you open it.
      //
      // Yields to hover explicitly. Both are backgrounds, and Tailwind's emit
      // order — not the order in this array — decides which wins otherwise.
      'data-has-child-items:not-data-hovered:bg-band',
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
  // The indentation sits on this wrapper inside the cell rather than on the
  // cell's own padding, so it composes with `--cell-edge-padding` instead of
  // competing with it.
  treeIndent: cva({
    base: [
      'flex items-center gap-2',
      // No indentation for the first level of children.
      //
      // The control lives in a fixed leading gutter that every row reserves, so
      // a group row, its children and a root-level row all put their value at
      // the same x. That keeps the tree column a single scannable column — which
      // is the point of the whole feature: the ABR-Nr. you are searching for has
      // to be findable by eye, and staggering it by level is what breaks that.
      // Containment is carried by the group row's band instead.
      //
      // Level 3 and deeper do indent. One level is what this is designed for and
      // what the docs recommend, but a deeper tree collapsing into a flat list
      // would be unreadable, so depth degrades gracefully rather than silently.
      // `--table-row-level` is published by React Aria and starts at 1.
      'ps-[calc(max(var(--table-row-level,1)-2,0)*var(--tree-indent))]',
      // Group rows carry more weight than their children. Only the tree column
      // renders this wrapper, so the emphasis stays scoped to it.
      '[[data-has-child-items]_&]:font-semibold',
    ],
  }),
  expandButton: cva({
    base: [
      // A ghost icon button: `ui-button-base` brings the shared button anatomy
      // (radius, focus ring via `ui-interactive`, the svg reset) and the ghost
      // hover wash blends it into whatever ground the row is on — including the
      // group row's own band, since the wash is `bg-current/10` rather than a
      // fixed fill.
      'ui-button-base shrink-0',
      'size-(--tree-chevron-size)',
      // Same colour as the Accordion caret, so the two read as one system and
      // the control does not compete with the group row's emphasised label.
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
