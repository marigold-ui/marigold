import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center gap-[0.5ch]',
    'disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed',
    'focus:outline-0',
    'border-border-dark bg-bg-neutral text-text-dark ease-ease-out h-6 cursor-pointer rounded-sm border px-4 py-0 text-sm leading-6 transition-all duration-200 disabled:cursor-none',
    'hover:bg-bg-hover-light',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-primary bg-bg-primary text-text-light',
          'hover:bg-bg-primary-hover hover:border-border-primary-hover ',
        ],
        link: [
          'text-text-primary-light border-none bg-transparent',
          'hover:bg-transparent hover:underline',
        ],
        text: [' border-none bg-transparent', 'hover:bg-bg-hover-light'],
      },
      size: {
        small: 'p-1',
      },
    },
  }
);
