import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-[0.5ch]',
    'mg-disabled:cursor-not-allowed mg-disabled:border-button-disabled-border mg-disabled:bg-button-disabled-background mg-disabled:text-button-disabled-text',
    'mg-focus:outline-0',
    'border-button-base-border bg-button-base-background text-button-base-text ease-ease-out mg-disabled:cursor-none h-6 cursor-pointer rounded-sm border px-4 py-0 text-sm leading-6 transition-all duration-200',
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
          'text-button-link-text border-none bg-transparent',
          'mg-hover:bg-transparent mg-hover:underline',
        ],
        text: [' border-none bg-transparent', 'mg-hover:bg-button-text-hover'],
      },
      size: {
        small: 'p-1',
      },
    },
  }
);
