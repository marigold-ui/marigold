import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva({
  base: [
    'ui-button-base gap-2',
    'duration-150 active:scale-[0.97] pressed:not-aria-expanded:scale-[0.97]',
    'pending:ui-state-disabled',
  ],
  variants: {
    variant: {
      primary: [
        'ui-surface-contrast',
        'hover:[--ui-background-color:oklch(from_var(--color-primary)_calc(l-0.15)_c_h)]',
      ],
      secondary: [
        'ui-surface shadow-elevation-border',
        'hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)] hover:text-foreground',
        'expanded:[--ui-background-color:var(--color-hover)] expanded:[--ui-border-color:oklch(from_var(--color-border)_calc(l-0.1)_c_h)]',
      ],
      ghost: 'hover:ui-state-hover-ghost',
      destructive:
        'bg-destructive-bold text-destructive-bold-foreground hover:bg-destructive-bold/70',
      'destructive-ghost': 'text-destructive-accent hover:ui-state-hover-ghost',
      link: 'text-link ui-touch-hitbox',
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
      class: 'h-control p-squish-relaxed [&_svg]:size-4',
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
      class: 'h-control-small px-3 [&_svg]:size-3.5',
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
      class: 'h-control-large px-8 [&_svg]:size-5',
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
      class: 'size-control [&_svg]:size-4',
    },
  ],
});
