import { type ThemeComponent, cva } from '@marigold/system';

// A row is a three-column grid — leading media, text, trailing actions — and
// every region claims its cell from CSS, never from JavaScript inspecting the
// children. Text lines auto-flow down column 2 (label first, then each
// description); media and actions span that stack via `row-span-6` so they
// stay centered next to it. Six is a ceiling, not a count: the row has no row
// gap, so the rows a shorter stack leaves unused are 0-high and cost nothing.
export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: [
      'w-full outline-0 flex flex-col',
      '[--listview-item-px:var(--spacing-stretch-regular-x)]',
    ],
    variants: {
      // `default` is a bounded surface of its own (ring, shadow, radius).
      // `plain` drops that frame — divider lines only — so the list can sit
      // inside a container that already provides one, e.g. the Popover
      // notifications panel this component was built for.
      variant: {
        default: [
          'divide-y divide-border ui-surface shadow-elevation-border',
          '[--listview-item-radius:calc(var(--radius-surface)-1px)]',
        ],
        // Only `plain` is edge-aware. A bled `Panel.Content` /
        // `Panel.CollapsibleContent` / `Drawer.Content` publishes `--bleed-px`
        // (its own `--panel-px`), and a nested `plain` list adopts it as its
        // row padding: dividers and hover fill reach the container border while
        // the row text lines up with the container title, mirroring Table and
        // Accordion. Outside a bled container the fallback keeps the standalone
        // padding. `default` deliberately opts out — it carries its own frame,
        // so it shouldn't inherit the container's edge inset.
        plain: [
          'divide-y divide-border',
          '[--listview-item-px:var(--bleed-px,var(--spacing-stretch-regular-x))]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'group/option relative grid items-center',
      // No column gap: the media and actions columns collapse to 0 when a row
      // has neither, and a gap would still inset the text by its width on
      // both sides — enough to break the alignment with a bled container's
      // title that `variant="plain"` exists for. The spacing rides on the
      // regions themselves (`me-3`/`ms-3`), so it only exists when they do.
      'grid-cols-[auto_minmax(0,1fr)_auto]',
      // Leading media (an icon, an avatar, a logo) is consumer markup that
      // reads no slot context, so it's placed by its position in the DOM: the
      // first child no context has claimed — i.e. carries no `data-grid-area`
      // — takes column 1. Keying on the DOM rather than on `child.type` means
      // fragments, `memo()` and consumer wrappers don't change the outcome,
      // because none of them leave a node behind. Trailing controls have their
      // own region, `<ListView.Actions>`.
      // The extra `>*` is RAC's `role="gridcell"` wrapper: it's
      // `display: contents`, so the row's children are its grandchildren in
      // the DOM but its direct items in the grid.
      '[&>*>*:first-child:not([data-grid-area])]:col-start-1',
      '[&>*>*:first-child:not([data-grid-area])]:row-start-1',
      '[&>*>*:first-child:not([data-grid-area])]:row-span-6',
      '[&>*>*:first-child:not([data-grid-area])]:self-center',
      '[&>*>*:first-child:not([data-grid-area])]:me-3',
      // `--listview-item-px` is set per variant on the list (see above): the
      // standalone padding by default, a bled container's `--bleed-px` for
      // `plain`.
      'px-(--listview-item-px) py-(--spacing-stretch-regular-y)',
      'text-sm text-foreground outline-none',
      'transition-[border,color]',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
      // Round the first/last row to match the surface's own corners: a
      // square-cornered row's hover fill/focus outline would otherwise poke
      // past the rounded container edge.
      'first:rounded-t-(--listview-item-radius) last:rounded-b-(--listview-item-radius)',
    ],
    variants: { variant: { default: '' } },
    defaultVariants: { variant: 'default' },
  }),
  label: cva({ base: 'col-start-2 row-start-1 self-center' }),
  title: cva({ base: 'col-start-2 row-start-1 self-center' }),
  description: cva({
    // No `row-start`: each description auto-flows onto the next row of the
    // text column, so a row can carry more than one metadata line.
    base: [
      'col-start-2 self-center',
      'text-xs font-normal text-secondary group-disabled/option:text-disabled',
    ],
  }),
  action: cva({
    // `[&>*]:shrink-0` protects each trailing control (Switch, Button,
    // IconButton, ActionMenu trigger) from being squeezed by its siblings
    // when the row is tight — without it, a ghost icon Button silently
    // loses its square shape (invisible until its hover fill reveals the
    // squashed box) to make room for a neighboring Switch that refuses to
    // shrink below its own min-content floor.
    base: [
      'col-start-3 row-start-1 row-span-6 self-center justify-self-end ms-3',
      'flex items-center gap-1 [&>*]:shrink-0',
    ],
  }),
};
