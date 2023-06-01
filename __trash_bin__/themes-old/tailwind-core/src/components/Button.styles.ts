import { tv, type TVReturnType } from 'tailwind-variants';
export const button: TVReturnType<any, any, any, any, any, any> = tv({
  base: [
    'border-button-base-border bg-button-base-background h-6 rounded-sm border px-4 py-0',
    'text-button-base-text text-sm leading-6',
    'ease-ease-out cursor-pointer transition-all duration-200',
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
      text: ['border-none bg-transparent', 'hover:bg-button-text-hover'],
    },
    size: {
      small: 'p-1',
    },
  },
});
