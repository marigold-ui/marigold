import { cva } from 'class-variance-authority';

export const Button = cva(
  [
    'inline-flex items-center justify-center gap-[0.5ch]',
    'mg-disabled:cursor-not-allowed mg-disabled:border-button-disabled-border mg-disabled:bg-button-disabled-background mg-disabled:text-button-disabled-text',
    'mg-focus:outline-0',
    'border px-4 py-0 rounded-sm border-button-base-border h-6 bg-button-base-background text-sm leading-6 text-button-base-text cursor-pointer transition-all duration-200 ease-ease-out mg-disabled:cursor-none',
    'mg-hover:bg-secondary-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-button-primary-border bg-button-primary-background text-button-primary-text',
          'mg-hover:bg-button-primary-hover mg-hover:border-button-primary-hover',
        ],
        link: [
          'border-none bg-transparent text-button-link-text',
          'mg-hover:bg-transparent mg-hover:underline',
        ],
        text: ['bg-transparent border-none', 'mg-hover:bg-button-text-hover'],
      },
      size: {
        small: 'p-1',
      },
    },
  }
);
