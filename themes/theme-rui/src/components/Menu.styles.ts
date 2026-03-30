import { ThemeComponent, cva } from '@marigold/system';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva({
    base: [
      'ui-surface shadow-elevation-overlay w-full',
      'text-foreground overflow-x-hidden p-1 outline-none overflow-y-auto',
      // In a Tray
      'group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:shadow-none',
    ],
  }),
  item: cva({
    base: [
      'relative flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-11',
      'disabled:text-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
    ],
    variants: {
      variant: {
        default:
          'text-foreground focus:bg-focus-highlight [&_svg]:text-secondary [&_svg]:opacity-60',
        destructive: 'text-destructive-accent focus:bg-destructive-accent/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  section: cva({
    base: 'text-secondary p-2 text-xs font-medium border-t border-t-border in-first:border-t-0',
  }),
  button: cva({
    base: [
      'ui-button-base gap-2',
      'duration-150 active:scale-[0.97] pressed:not-aria-expanded:scale-[0.97]',
      'pending:ui-state-disabled',
    ],
    variants: {
      variant: {
        default: [
          'ui-surface shadow-elevation-border',
          'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
          'disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled-surface)]',
          'pending:[--ui-background-color:var(--color-disabled-surface)] pending:border-0 pending:shadow-none',
          'expanded:[--ui-background-color:var(--color-hover)]',
        ],
        ghost: 'hover:ui-state-hover',
      },
      size: {
        default: 'text-sm',
        small: 'text-xs',
        large: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: ['default', 'ghost'],
        class: 'items-center justify-center',
      },
      {
        variant: ['default', 'ghost'],
        size: 'default',
        class: 'h-control p-squish-relaxed [&_svg]:size-4',
      },
      {
        variant: ['default', 'ghost'],
        size: 'small',
        class: 'h-control-small px-3 [&_svg]:size-3.5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'large',
        class: 'h-control-large px-8 [&_svg]:size-5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'icon',
        class: 'size-control [&_svg]:size-4',
      },
    ],
  }),
};
