import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'border-none borderRadius-8px lineHeight-48px px-large ',
  variants: {
    variant: {
      info: 'bg-blue-500 hover:bg-blue-700',
      dark: 'bg-red-500 hover:bg-red-700',
    },
  },
});
