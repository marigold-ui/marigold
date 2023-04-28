import { tv } from 'tailwind-variants';

export const text = tv({
  variants: {
    variant: {
      bold: ['font-bold'],
      muted: ['text-disabled-text'],
    },
  },
});
