import { tv } from 'tailwind-variants';

export const badge = tv({
  base: 'inline-flex align-middle text-xxsmall rounded-3xl whitespace-nowrap px-2 py-0.5',
  variants: {
    variant: {
      info: 'text-badge-info-text bg-badge-info-background',
      dark: 'text-badge-dark-text bg-badge-dark-background',
    },
  },
});
