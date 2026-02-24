import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva({
  base: [
    'ui-button-base',
    'duration-150 active:scale-[0.97] pressed:not-aria-expanded:scale-[0.97]',
    'pending:ui-state-disabled',
  ],
  variants: {
    variant: {
      primary: [
        'ui-surface-contrast',
        'hover:[--ui-background-color:oklch(from_var(--color-brand)_calc(l-0.05)_c_h)]',
      ],
      secondary: [
        'ui-surface shadow-elevation-border',
        'hover:[--ui-background-color:var(--color-hover)] hover:text-foreground',
        'expanded:[--ui-background-color:var(--color-hover)]',
      ],
      ghost: 'hover:bg-current/10',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      'destructive-ghost': 'text-destructive hover:bg-current/8',
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
});
