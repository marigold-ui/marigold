import { cva } from 'class-variance-authority';
export const Underlay = cva('fixed inset-0 z-[1]', {
  variants: {
    variant: {
      modal: ['bg-underlay-background backdrop-blur-sm'],
    },
  },
});
