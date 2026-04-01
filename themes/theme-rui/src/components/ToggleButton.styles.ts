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

      // ToggleButton-specific styles
      'ui-surface shadow-elevation-border',
      'hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)] hover:text-foreground',
      'disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled-surface)]',
      'selected:[--ui-background-color:var(--color-primary)] selected:text-primary-foreground selected:shadow-none',

      // Group-specific styles for ToggleButtonGroup
      // Group uses overflow-hidden to clip backgrounds to its border radius
      'in-[.group]:rounded-none in-[.group]:shadow-none in-[.group]:border-y-0 in-[.group]:border-l-0',
      'in-[.group]:last:border-r-0',
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
