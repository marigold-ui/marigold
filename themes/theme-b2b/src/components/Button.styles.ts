import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'rounded-sm border-none px-8 leading-[48px] outline-0',
    'outline-outline-focus outline-[1px] outline-offset-1 focus-visible:outline',
    'disabled:text-text-disabled bg-bg-disabled',
    'bg-red-500',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-bg-primary'],
      },
    },
  }
);
