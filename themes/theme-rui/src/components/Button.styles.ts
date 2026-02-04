import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

// Shared base styles for Button and ToggleButton
export const buttonBase = [
  'inline-flex items-center justify-center gap-2',
  'whitespace-nowrap rounded-surface font-medium transition-[color,box-shadow,transform]',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
  'cursor-pointer',
] as const;

export const Button: ThemeComponent<'Button'> = cva(
  [
    ...buttonBase,
    'duration-150 active:scale-[0.97] pressed:not-expanded:scale-[0.97]',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand/90',
        secondary: [
          'ui-surface shadow-elevation-border',
          'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
          'disabled:border-0 disabled:shadow-none disabled:[--ui-background-color:var(--color-disabled)]',
          'expanded:[--ui-background-color:var(--color-hover)]',
        ],
        ghost: 'hover:bg-hover hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'destructive-ghost': 'text-destructive hover:bg-destructive/10',
        link: 'text-link util-touch-hitbox',
      },
      size: {
        default: 'text-sm',
        small: 'text-xs',
        large: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: [
          'primary',
          'secondary',
          'destructive',
          'ghost',
          'destructive-ghost',
        ],
        class: 'items-center justify-center',
      },
      {
        variant: [
          'primary',
          'secondary',
          'destructive',
          'ghost',
          'destructive-ghost',
        ],
        size: 'default',
        class: 'h-button p-squish-relaxed [&_svg]:size-4',
      },
      {
        variant: [
          'primary',
          'secondary',
          'destructive',
          'ghost',
          'destructive-ghost',
        ],
        size: 'small',
        class: 'h-button-small px-3 [&_svg]:size-3.5',
      },
      {
        variant: [
          'primary',
          'secondary',
          'destructive',
          'ghost',
          'destructive-ghost',
        ],
        size: 'large',
        class: 'h-button-large px-8 [&_svg]:size-5',
      },
      {
        variant: [
          'primary',
          'secondary',
          'destructive',
          'ghost',
          'destructive-ghost',
        ],
        size: 'icon',
        class: 'size-button [&_svg]:size-4',
      },
    ],
  }
);
