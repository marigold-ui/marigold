import { tv, type TVReturnType } from 'tailwind-variants';
export const text: TVReturnType<any, any, any, any, any, any> = tv({
  variants: {
    variant: {
      bold: ['font-bold'],
      muted: ['text-disabled-text'],
    },
  },
});
