import { cva } from 'class-variance-authority';

export const Text = cva('', {
  variants: {
    variant: {
      bold: ['font-bold'],
      muted: ['text-disabled-text'],
    },
  },
});
