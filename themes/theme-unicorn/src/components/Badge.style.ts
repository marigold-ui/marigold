import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'inline-flex align-middle text-base rounded-3xl whitespace-nowrap py-4 px-12',
  variants: {
    variant: {
      info: 'text-purple-100 bg-purple-700 hover:bg-purple-800',
      dark: 'text-gray-100 bg-gray-700 hover:bg-gray-800',
    },
  },
});
