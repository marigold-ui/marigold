import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'border px-4 py-0 rounded-sm border-button-base-border h-6 bg-button-base-background',
    'text-sm leading-6 text-button-base-text',
    'cursor-pointer transition-all duration-200 ease-ease-out',
    'disabled:cursor-none disabled:border-button-disabled-border disabled:bg-button-disabled-background disabled:text-button-disabled-text',
  ],
  variants: {
    variant: {
      primary:
        'border-button-primary-border bg-button-primary-background text-button-primary-text',
    },
  },
});
