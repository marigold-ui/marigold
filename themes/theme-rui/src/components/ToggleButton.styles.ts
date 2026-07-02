import { ThemeComponent, cva } from '@marigold/system';

export const ToggleButton: ThemeComponent<'ToggleButton'> = {
  group: cva({
    base: 'group inline-flex overflow-hidden ui-surface shadow-elevation-border',
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
      // Neutral button: the secondary Button look (muted gloss surface).
      'ui-surface-muted shadow-elevation-border',
      // Flip on/off instantly; an animated box-shadow can't tween cleanly here.
      'transition-none',

      // Hover: shared neutral-button hover (matches secondary Button + Menu trigger).
      'hover:ui-state-hover-muted',
      // On: sunken dark-gray surface (drop elevation, dark inner-top recess, visible dark edge).
      'selected:[background:var(--color-toggle-selected)] selected:text-selected-bold-foreground',
      'selected:shadow-none selected:[--ui-border-color:var(--color-toggle-selected-edge)]',
      'selected:inset-shadow-[0_2px_3px_-1px_oklch(from_var(--color-charcoal-950)_l_c_h_/_0.5)]',
      // Disabled comes from ui-button-base (disabled:ui-state-disabled), same as Button.

      // Group: segments share the group's surface + ring; a transparent right border
      // draws the 1px divider (removed on the last). Border lives here, not ui-button-base.
      'in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-r in-[.group]:border-transparent in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial]',
      'in-[.group]:disabled:border-r-border',
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
