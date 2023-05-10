import { tv, type TVReturnType } from 'tailwind-variants';
export const button: TVReturnType<any, any, any, any, any, any> = tv({
  base: [
    'border px-4 py-0 rounded-sm border-button-base-border h-6 bg-button-base-background',
    'text-sm leading-6 text-button-base-text',
    'cursor-pointer transition-all duration-200 ease-ease-out',
    'mg-disabled:cursor-none mg-disabled:border-button-disabled-border mg-disabled:bg-button-disabled-background mg-disabled:text-button-disabled-text',
    'hover:bg-secondary-50',
  ],
  variants: {
    variant: {
      primary: [
        'border-button-primary-border bg-button-primary-background text-button-primary-text',
        'hover:bg-button-primary-hover hover:border-button-primary-hover',
      ],
      link: [
        'border-none bg-transparent',
        'text-button-link-text',
        'hover:bg-transparent hover:underline',
      ],
      text: ['bg-transparent border-none', 'hover:bg-button-text-hover'],
    },
    size: {
      small: 'p-1',
    },
  },
});
