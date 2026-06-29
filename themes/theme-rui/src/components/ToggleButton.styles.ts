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

      // States — match the secondary Button. ui-surface-muted hardcodes its
      // gradient fill, so state fills override `background` directly (not --ui-background-color).
      'hover:[background:linear-gradient(to_bottom,var(--color-white),var(--color-charcoal-50))] hover:[--ui-border-color:var(--color-surface-border-hover)] hover:text-foreground',
      'selected:[background:var(--color-selected-bold)] selected:text-selected-bold-foreground selected:shadow-none',
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
