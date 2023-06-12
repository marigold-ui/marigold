import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'rounded-sm border-none px-8 leading-[48px] outline-0',
    'outline-outline-focus outline-[1px] focus-visible:outline',
    'disabled:text-text-disabled disabled:bg-bg-disabled',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-text-light bg-bg-primary',
          'data-[hover]:text-text-light data-[hover]:bg-bg-hover',
        ],
        secondary: [
          'text-text-light bg-bg-dark data-[hover]:text-text-light data-[hover]:bg-brand-secondary-600',
        ],
        // ghost: [
        //   'border-brand-secondary-700 border border-solid',
        //   'text-text-primary',
        //   'data-[hover]:bg-bg-hover',
        // ],
        text: [
          'text-text-primary data-[hover]:text-text-primary data-[hover]:outline-outline-dark data-[hover]:bg-bg-hover',
        ],
      },
      size: {
        small: 'p-1',
      },
    },
  }
);
