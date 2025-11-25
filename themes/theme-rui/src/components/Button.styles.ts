import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform]',
    'duration-150 active:scale-[0.98] pressed:scale-[0.98]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:util-focus-ring outline-none disabled:util-disabled',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground shadow-xs hover:bg-brand/90',
        secondary:
          'border border-input bg-background shadow-xs hover:bg-hover hover:text-foreground expanded:bg-hover',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        'destructive-ghost': 'text-destructive hover:bg-destructive/10',
        ghost: 'hover:bg-hover hover:text-foreground',
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
        class: 'h-button px-4 py-2 [&_svg]:size-4',
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
