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
      // Neutral button = the secondary Button look (muted gloss surface).
      'ui-surface-muted shadow-elevation-border',
      // Flip on/off in one frame: the fill is instant, so an animated box-shadow
      // would smear the off-state gloss over the on-state dark fill — and the off/on
      // shadow layer counts differ, so it can't tween cleanly anyway.
      'transition-none',

      // States — match the secondary Button. ui-surface-muted hardcodes its
      // gradient fill, so state fills override `background` directly (not --ui-background-color).
      'hover:[background:linear-gradient(to_bottom,var(--color-white),var(--color-charcoal-50))] hover:[--ui-border-color:var(--color-surface-border-hover)] hover:text-foreground',
      // On = sunken dark-gray surface: drop elevation, swap the white gloss for a
      // dark inner-top recess, and recolor the ring to a visible dark edge — the
      // faint muted ring vanishes on a dark fill, which made a grouped segment look
      // shorter than its neighbours.
      'selected:[background:var(--color-toggle-selected)] selected:text-selected-bold-foreground',
      'selected:shadow-none selected:[--ui-border-color:var(--color-toggle-selected-edge)]',
      'selected:inset-shadow-[0_2px_3px_-1px_oklch(from_var(--color-charcoal-950)_l_c_h_/_0.5)]',
      'disabled:shadow-none disabled:[background:var(--color-disabled-surface)]',

      // Group: buttons share the group's outer surface and border
      'in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0 in-[.group]:last:border-r-0 in-[.group]:hover:[--ui-border-color:initial]',
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
