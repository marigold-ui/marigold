import { tv } from 'tailwind-variants';

export const Badge = tv({
  base: 'border-none borderRadius-8px lineHeight-48px px-large bg-blue-500 text-black-500',
  variants: {
    info: 'bg-blue-500 hover:bg-blue-700',
    dark: 'bg-purple-500 hover:bg-purple-700',
  },
});
