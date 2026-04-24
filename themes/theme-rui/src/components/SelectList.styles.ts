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
        // the inner scrolling list can carry padding for the `ui-state-focus`
        // outline without offsetting the surface from the field's label and
        // help text.
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
      // `p-1` gives the 3px `ui-state-focus` outline on each item room to
      // render without being clipped by the list's overflow boundary.
      'outline-0 flex p-1',
      'orientation-vertical:w-full orientation-vertical:flex-col orientation-vertical:overflow-x-hidden orientation-vertical:overflow-y-auto',
      'orientation-horizontal:w-fit orientation-horizontal:flex-row orientation-horizontal:overflow-x-auto orientation-horizontal:overflow-y-hidden',
    ],
    variants: {
      variant: {
        // `gap-1` matches the list's `p-1`: every option has 4px of room for
        // its focus outline on all sides, so the ring does not overlap the
        // neighbouring option and the first/last items read as centred.
        default: 'gap-1',
        // Bordered has no surface on the container, so the matching negative
        // margin pulls the list back to keep items aligned with the field's
        // label and help text.
        bordered: 'gap-2 -m-1',
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
      'focus-visible:ui-state-focus focus-visible:z-1 transition-[border,color,background]',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground',
      'group-orientation-horizontal/list:min-w-40',
    ],
    variants: {
      variant: {
        default: [
          // `px-1` (4px) + the list's `p-1` padding gives an 8px visual gap
          // from the surface's inner border to the option content.
          'rounded-md px-1 py-2 min-h-14',
          'selected:bg-selected',
          // Hover only shifts the background to the theme's hover color.
          'hover:bg-hover',
          // Dividers are rendered as a ::after pseudo-element so they can
          // extend past the item's rounded corners into the list's `p-1`
          // padding — the line goes edge to edge of the surface and uses the
          // same color token as `ui-surface`'s outer border. The pseudo sits
          // in the middle of the list's `gap-1` between options.
          'not-last:after:content-[""] not-last:after:absolute not-last:after:bg-surface-border',
          'group-orientation-vertical/list:not-last:after:-inset-x-1 group-orientation-vertical/list:not-last:after:-bottom-0.5 group-orientation-vertical/list:not-last:after:h-px',
          'group-orientation-horizontal/list:not-last:after:-inset-y-1 group-orientation-horizontal/list:not-last:after:-right-0.5 group-orientation-horizontal/list:not-last:after:w-px',
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
