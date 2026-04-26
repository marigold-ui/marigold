import { type ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  container: cva({
    base: [
      // Container width follows the list's orientation: vertical fills,
      // horizontal hugs its rows.
      'flex',
      'has-orientation-vertical:w-full',
      'has-orientation-horizontal:w-fit',
    ],
    variants: {
      variant: {
        // Surface lives on the outer container so the inner list can fill it
        // edge-to-edge with hover/selected backgrounds.
        default: 'ui-surface shadow-elevation-border',
        bordered: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  list: cva({
    base: [
      'outline-0 flex',
      'orientation-vertical:w-full orientation-vertical:flex-col orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto',
      'orientation-horizontal:w-fit orientation-horizontal:flex-row orientation-horizontal:overflow-x-auto orientation-horizontal:overflow-y-hidden',
    ],
    variants: {
      variant: {
        // Option padding is exposed as CSS custom properties — `<SelectList>`
        // overrides them via inline `style` from the `p` / `px` / `py` props,
        // and the cascade carries the values down to every option (which reads
        // them via `px-(--selectlist-item-px) py-(--selectlist-item-py)`).
        default: [
          // No gap so hover/selected backgrounds fill the row edge-to-edge.
          '[--selectlist-item-px:var(--spacing-stretch-regular-x)]',
          '[--selectlist-item-py:var(--spacing-stretch-regular-y)]',
          // Inner-curve radius for first/last items (surface radius minus the
          // 1px surface border). Read by items via `rounded-*-(--…)`.
          '[--selectlist-item-radius:calc(var(--radius-surface)-1px)]',
        ],
        bordered: [
          'gap-2',
          '[--selectlist-item-px:var(--spacing-square-relaxed-x)]',
          '[--selectlist-item-py:var(--spacing-square-relaxed-y)]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'relative grid items-center gap-x-3',
      'grid-cols-[auto_1fr_auto]',
      // Row 1 minimum matches the label's line-height (text-sm == 1.25rem) so
      // the indicator stays aligned with the label's first line even when the
      // option content uses a row-spanning wrapper (e.g. a leading illustration).
      'grid-rows-[minmax(1.25rem,auto)_auto]',
      // Plain-string children inherit the label look without a <Text slot="label">.
      'text-sm font-medium text-foreground outline-none',
      'cursor-default data-selection-mode:cursor-pointer',
      // Inset focus ring so it can't be clipped by the list's `overflow`.
      'focus-visible:inset-shadow-[0_0_0_2px_var(--color-ring)] transition-[border,color,background]',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'group-orientation-horizontal/list:min-w-40',
    ],
    variants: {
      variant: {
        default: [
          'min-h-14',
          'selected:bg-selected hover:bg-hover',
          // First/last items hug the surface's inner curve.
          'group-orientation-vertical/list:first:rounded-t-(--selectlist-item-radius) group-orientation-vertical/list:last:rounded-b-(--selectlist-item-radius)',
          'group-orientation-horizontal/list:first:rounded-l-(--selectlist-item-radius) group-orientation-horizontal/list:last:rounded-r-(--selectlist-item-radius)',
          // Dividers as real borders (not pseudos) so they paint with the
          // element and never cover the focus ring. Only non-last items carry
          // the border; `min-h-14` is on the border-box so heights stay aligned.
          'group-orientation-vertical/list:not-last:border-b group-orientation-vertical/list:not-last:border-surface-border',
          'group-orientation-horizontal/list:not-last:border-r group-orientation-horizontal/list:not-last:border-surface-border',
        ],
        bordered: [
          // Each option is its own surface; selected/hover reuse the surface's
          // border/background hooks so visuals follow the design system. The
          // 0.5px inset shadow on selected reads as a thicker border without
          // shifting layout.
          'ui-surface shadow-elevation-border min-h-14',
          'selected:[--ui-border-color:var(--color-foreground)] selected:inset-shadow-[0_0_0_0.5px_var(--ui-border-color)]',
          'hover:[--ui-background-color:var(--color-hover)]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  label: cva({ base: 'col-start-2 row-start-1' }),
  description: cva({
    base: 'col-start-2 row-start-2 text-xs font-normal text-muted-foreground',
  }),
  indicator: cva({
    base: 'flex shrink-0 items-center justify-center row-start-1 col-start-1 self-center',
  }),
  action: cva({
    base: 'row-span-2 row-start-1 col-start-3 flex items-center justify-end',
  }),
};
