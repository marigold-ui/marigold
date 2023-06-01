import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'inline-flex whitespace-nowrap rounded-3xl px-3 py-1 align-middle text-base',
  variants: {
    variant: {
      info: 'text-purple10 bg-purple70',
      dark: 'text-gray10 bg-gray70 hover:bg-gray80',
    },
  },
});
