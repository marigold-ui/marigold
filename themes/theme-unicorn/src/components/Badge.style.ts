import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'border-none borderRadius-8px lineHeight-48px px-large',
  variants: {
    info: 'purple10 bg-purple70',
    dark: 'gray00 bg-gray70',
  },
});
