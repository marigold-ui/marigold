import { tv, type TVReturnType } from 'tailwind-variants';

export const badge: TVReturnType<any, any, any, any, any, any> = tv({
  base: 'text-xxsmall inline-flex whitespace-nowrap rounded-3xl px-2 py-0.5 align-middle',
  variants: {
    variant: {
      info: 'text-info-text bg-info-bg',
      dark: 'text-dark-text bg-dark-bg',
    },
  },
});
