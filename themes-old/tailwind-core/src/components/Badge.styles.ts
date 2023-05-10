import { tv, type TVReturnType } from 'tailwind-variants';

export const badge: TVReturnType<any, any, any, any, any, any> = tv({
  base: 'inline-flex align-middle text-xxsmall rounded-3xl whitespace-nowrap px-2 py-0.5',
  variants: {
    variant: {
      info: 'text-info-text bg-info-bg',
      dark: 'text-dark-text bg-dark-bg',
    },
  },
});
