import { tv } from 'tailwind-variants';

export const underlay = tv({
  base: [''],
  variants: {
    variant: {
      modal: ['bg-underlay-background backdrop-blur-sm'],
    },
  },
});
