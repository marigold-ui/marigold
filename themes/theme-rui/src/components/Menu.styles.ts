import { ThemeComponent, cva } from '@marigold/system';
import { buttonBase } from './Button.styles';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva({
    base: [
      'ui-surface shadow-elevation-overlay w-full',
      'text-foreground overflow-hidden p-1 outline-none',
      // In a Tray
      'group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:shadow-none',
    ],
  }),
  item: cva({
    base: [
      'relative flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap',
      'disabled:text-disabled-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4',
    ],
    variants: {
      variant: {
        default: 'text-foreground focus:bg-focus [&_svg]:opacity-60',
        destructive: 'text-destructive focus:bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  section: cva({
    base: 'text-muted-foreground p-2 text-xs font-medium border-t border-t-border in-first:border-t-0',
  }),
  button: cva({
    base: [
      ...buttonBase,
      'duration-150 active:scale-[0.97] pressed:not-aria-expanded:scale-[0.97]',
      'pending:ui-state-disabled',
    ],
    variants: {
      variant: {
        default: [
          'ui-surface shadow-elevation-border',
          'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
          'disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)]',
          'pending:[--ui-background-color:var(--color-disabled)] pending:border-0 pending:shadow-none',
          'expanded:[--ui-background-color:var(--color-hover)]',
        ],
        ghost: 'hover:bg-hover hover:text-foreground',
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
        class: 'h-button p-squish-relaxed [&_svg]:size-4',
      },
      {
        variant: ['default', 'ghost'],
        size: 'small',
        class: 'h-button-small px-3 [&_svg]:size-3.5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'large',
        class: 'h-button-large px-8 [&_svg]:size-5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'icon',
        class: 'size-button [&_svg]:size-4',
      },
    ],
  }),
};
