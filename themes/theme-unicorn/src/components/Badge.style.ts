import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'inline-flex align-middle text-base rounded-3xl whitespace-nowrap py-1 px-3',
  variants: {
    variant: {
      info: 'text-purple10 bg-purple70',
      dark: 'text-gray-100 bg-gray-700 hover:bg-gray-800',
    },
  },
});
