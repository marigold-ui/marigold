import { type ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  container: cva({
    base: [
      'flex',
      // Container width follows the list's orientation so the surface wraps
      // a horizontal list without stretching to the full field width.
      'has-orientation-vertical:w-full',
      'has-orientation-horizontal:w-fit',
    ],
    variants: {
      variant: {
        // Surface lives on the outer container (Menu / ListBox pattern) so
        // the scrolling list inside can fill the surface edge-to-edge with
        // hover/selected backgrounds.
        default: 'ui-surface shadow-elevation-border',
        bordered: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  list: cva({
    base: [
      'outline-0 flex',
      'orientation-vertical:w-full orientation-vertical:flex-col orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto',
      'orientation-horizontal:w-fit orientation-horizontal:flex-row orientation-horizontal:overflow-x-auto orientation-horizontal:overflow-y-hidden',
    ],
    variants: {
      variant: {
        // No gap so hover/selected backgrounds fill the row edge-to-edge.
        default: '',
        bordered: 'gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  item: cva({
    base: [
      'relative grid items-center gap-x-3',
      'grid-cols-[auto_1fr_auto]',
      // Item default typography == label typography; plain-string children
      // inherit the label look without needing a <Text slot="label"> wrapper.
      'text-sm font-medium text-foreground outline-none',
      'cursor-default data-selection-mode:cursor-pointer',
      // Focus ring is rendered as an inset box-shadow so it lives inside the
      // item's box and cannot be clipped by the list's `overflow` boundary.
      'focus-visible:inset-shadow-[0_0_0_2px_var(--color-ring)] transition-[border,color,background]',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'group-orientation-horizontal/list:min-w-40',
    ],
    variants: {
      variant: {
        default: [
          // No outer rounding on items — hover/selected fills the row edge to
          // edge of the surface. Only the first/last items round their outer
          // corners so the fill follows the surface's `rounded-surface` curve.
          'px-3 py-2 min-h-14',
          // First/last item rounding follows the surface's inner curve:
          // `rounded-surface - 1px` (the surface's border width) so the fill
          // hugs the surface without a visible gap at the corners.
          'group-orientation-vertical/list:first:rounded-t-[calc(var(--radius-surface)-1px)] group-orientation-vertical/list:last:rounded-b-[calc(var(--radius-surface)-1px)]',
          'group-orientation-horizontal/list:first:rounded-l-[calc(var(--radius-surface)-1px)] group-orientation-horizontal/list:last:rounded-r-[calc(var(--radius-surface)-1px)]',
          'selected:bg-selected',
          'hover:bg-hover',
          // Dividers live on the item's trailing edge as a real border so
          // they paint with the element (not above it as a pseudo would) and
          // never sit on top of the focus ring. Only non-last items carry
          // the border — `min-h-14` is on the border-box so item heights
          // stay aligned without a transparent reservation, and the focus
          // ring on the last item reaches all the way to the surface edge.
          'group-orientation-vertical/list:not-last:border-b group-orientation-vertical/list:not-last:border-surface-border',
          'group-orientation-horizontal/list:not-last:border-r group-orientation-horizontal/list:not-last:border-surface-border',
        ],
        bordered: [
          // Each option is its own surface with the system's elevation
          // border; hover and selected states re-use the surface's border
          // hook (`--ui-border-color`) so the visuals follow the design
          // system instead of custom border tokens. Selected gets an extra
          // 0.5px inset shadow in the same color so the border reads as
          // thicker without shifting the layout.
          'ui-surface shadow-elevation-border p-4 min-h-14',
          'selected:[--ui-border-color:var(--color-foreground)] selected:inset-shadow-[0_0_0_0.5px_var(--ui-border-color)]',
          // Hover only shifts the surface background so the border stays
          // calm; uses the surface's `--ui-background-color` hook so the
          // gradient keeps rendering correctly.
          'hover:[--ui-background-color:var(--color-hover)]',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  label: cva({
    base: ['col-start-2 row-start-1'],
  }),
  description: cva({
    base: [
      'col-start-2 row-start-2',
      'text-xs font-normal text-muted-foreground',
    ],
  }),
  indicator: cva({
    base: [
      'flex shrink-0 items-center justify-center row-start-1 col-start-1 self-center',
    ],
  }),
  action: cva({
    base: ['row-span-2 row-start-1 col-start-3 flex items-center justify-end'],
  }),
};
