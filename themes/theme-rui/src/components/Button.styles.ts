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
        'hover:[--ui-background-color:var(--color-primary-hover)]',
      ],
      secondary: [
        'ui-surface-muted shadow-elevation-border',
        // hover keeps the gloss gradient but brightens it a step (white -> charcoal-50)
        // so the surface lifts instead of flattening; the opaque border carries the hover cue.
        'hover:[background:linear-gradient(to_bottom,var(--color-white),var(--color-charcoal-50))] hover:[--ui-border-color:var(--color-border-hover)] hover:text-foreground',
        // expanded (menu open) stays a flat fill to read as a held/active state, distinct from hover.
        'expanded:[background:var(--color-hover)] expanded:[--ui-border-color:var(--color-border-hover)]',
      ],
      ghost: 'hover:ui-state-hover-ghost',
      destructive: [
        'ui-surface-destructive',
        'hover:[--ui-background-color:var(--color-destructive-bold-hover)]',
      ],
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
