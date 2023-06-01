import { tv, type TVReturnType } from 'tailwind-variants';
export const underlay: TVReturnType<any, any, any, any, any, any> = tv({
  base: [''],
  variants: {
    variant: {
      modal: ['bg-underlay-background backdrop-blur-sm'],
    },
  },
});
