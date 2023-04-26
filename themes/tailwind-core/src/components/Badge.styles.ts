import { tv } from 'tailwind-variants';

export const badge = tv({
  base: 'inline-flex align-middle text-xxsmall rounded-3xl whitespace-nowrap px-2 py-0.5',
  variants: {
    variant: {
      info: 'text-info-text bg-info-background',
      dark: 'text-dark-text bg-dark-background',
    },
  },
});
