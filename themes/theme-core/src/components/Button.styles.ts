import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-[0.5ch]',
    'mg-disabled:cursor-not-allowed mg-disabled:border-border-disabled mg-disabled:bg-bg-disabled mg-disabled:text-text-disabled',
    'mg-focus:outline-0',
    'border-border-dark bg-bg-neutral text-text-dark ease-ease-out mg-disabled:cursor-none h-6 cursor-pointer rounded-sm border px-4 py-0 text-sm leading-6 transition-all duration-200',
    'mg-hover:bg-bg-hover-light',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-primary bg-bg-primary text-text-light',
          'mg-hover:bg-bg-primary-hover mg-hover:border-border-primary-hover',
        ],
        link: [
          'text-text-primary-light border-none bg-transparent',
          'mg-hover:bg-transparent mg-hover:underline',
        ],
        text: [' border-none bg-transparent', 'mg-hover:bg-bg-hover-light'],
      },
      size: {
        small: 'p-1',
      },
    },
  }
);
