import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap font-medium transition-[color,box-shadow,transform]',
    'duration-150 active:scale-[0.97] pressed:scale-[0.97]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary:
          'rounded-surface bg-brand text-brand-foreground hover:bg-brand/90',
        secondary:
          'ui-surface not-[[disabled]]:border hover:bg-hover hover:text-foreground expanded:bg-hover',
        ghost: 'rounded-surface hover:bg-hover hover:text-foreground',
        destructive:
          'rounded-surface bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'destructive-ghost':
          'rounded-surface text-destructive hover:bg-destructive/10',
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
