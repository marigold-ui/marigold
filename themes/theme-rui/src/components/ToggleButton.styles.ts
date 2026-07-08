import { ThemeComponent, cva } from '@marigold/system';

export const ToggleButton: ThemeComponent<'ToggleButton'> = {
  group: cva({
    // No `overflow-hidden`. The end segments round their own outer corners to
    // match the frame (below), so nothing needs clipping, and clipping is what
    // cut off a full-height segment's focus ring (DST-1597).
    base: 'group inline-flex ui-control shadow-elevation-border',
    variants: {
      size: {
        default: 'text-sm',
        small: 'text-xs',
        icon: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  button: cva({
    base: [
      'ui-button-base gap-2',
      // Standalone toggle = a control surface. In a group the group owns the
      // control boundary, so the segment drops its own ring + bevel (below).
      'ui-control shadow-elevation-border',

      // States
      'hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground',
      'selected:[--ui-background-color:var(--color-selected-bold)] selected:text-selected-bold-foreground selected:shadow-none',
      // Disabled comes from ui-button-base (disabled:ui-state-disabled), same as Button.

      // In a group, segments share the group's frame + ring, so they drop their
      // own ring, bevel and elevation. An opaque right border (--color-border,
      // the divider token) draws the 1px separator between segments, removed on
      // the last. The end segments round their outer corners to match the frame
      // so the group needs no overflow clip. Border lives here, not
      // ui-button-base.
      'in-[.group]:rounded-none in-[.group]:first:rounded-l-surface in-[.group]:last:rounded-r-surface in-[.group]:ring-0 in-[.group]:inset-shadow-none in-[.group]:shadow-none in-[.group]:border-r in-[.group]:border-r-border in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial]',
      // Focus. With the group no longer clipping, the standard ui-state-focus
      // outline (from ui-button-base) renders unclipped. Lift it above the
      // neighbouring segments so the full ring shows. (DST-1597)
      'in-[.group]:focus-visible:z-10',
    ],
    variants: {
      size: {
        default: 'text-sm',
        small: 'text-xs',
        icon: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
    compoundVariants: [
      {
        size: 'default',
        class: 'h-control px-4 py-2 [&_svg]:size-4',
      },
      {
        size: 'small',
        class: 'h-control-small px-3 [&_svg]:size-3.5',
      },
      {
        size: 'icon',
        class: 'size-control [&_svg]:size-4',
      },
    ],
  }),
};
