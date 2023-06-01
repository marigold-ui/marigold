import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'text-xxsmall inline-flex whitespace-nowrap rounded-3xl px-2 py-0.5 align-middle',
  variants: {
    variant: {
      info: 'text-blue10 bg-blue70',
      dark: 'text-gray00 bg-gray70',
    },
  },
});
