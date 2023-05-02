import { tv } from 'tailwind-variants';

export const label = tv({
  base: [
    'justify-end',
    'mg-disabled:text-disabled-text aria-required:font-bold',
  ],
});
