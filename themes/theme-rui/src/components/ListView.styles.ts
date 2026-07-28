import { type ThemeComponent, cva } from '@marigold/system';

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
      'group/option relative flex items-center gap-3',
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
  leading: cva({ base: 'flex shrink-0 items-center' }),
  content: cva({ base: 'flex min-w-0 flex-1 flex-col justify-center' }),
  label: cva({ base: '' }),
  title: cva({ base: '' }),
  description: cva({
    base: 'text-xs font-normal text-secondary group-disabled/option:text-disabled',
  }),
  action: cva({
    // `[&>*]:shrink-0` protects each trailing control (Switch, Button,
    // IconButton, ActionMenu trigger) from being squeezed by its siblings
    // when the row is tight — without it, a ghost icon Button silently
    // loses its square shape (invisible until its hover fill reveals the
    // squashed box) to make room for a neighboring Switch that refuses to
    // shrink below its own min-content floor.
    base: 'flex shrink-0 items-center justify-end gap-1 [&>*]:shrink-0',
  }),
};
