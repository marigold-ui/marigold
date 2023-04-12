import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'border px-4 py-0 rounded-sm border-solid border-button-border h-6 bg-button-background',
    'text-sm leading-6 text-button-text',
    'cursor-pointer transition-all duration-200 ease-ease-out',
  ],
});
