import { tv, type TVReturnType } from 'tailwind-variants';
export const label: TVReturnType<any, any, any, any, any, any> = tv({
  base: [
    'justify-end',
    'mg-disabled:text-disabled-text aria-required:font-bold',
  ],
});
