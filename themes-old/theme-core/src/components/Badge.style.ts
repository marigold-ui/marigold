import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'inline-flex align-middle text-xxsmall rounded-3xl whitespace-nowrap px-2 py-0.5',
  variants: {
    variant: {
      info: 'text-blue10 bg-blue70',
      dark: 'text-gray00 bg-gray70',
    },
  },
});
