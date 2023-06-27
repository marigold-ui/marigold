import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'rounded-sm border-none px-8 leading-[48px] outline-none',
    'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1',
    'disabled:text-text-disabled disabled:bg-bg-disabled',
  ],
  {
    variants: {
      variant: {
        primary: [
          'text-text-light bg-bg-primary',
          'data-[hover]:text-text-light data-[hover]:bg-bg-primary-hover',
        ],
        secondary: [
          'text-text-light bg-bg-dark data-[hover]:text-text-light data-[hover]:bg-bg-dark-hover',
        ],
        ghost: [
          'border-border-dark border border-solid',
          'text-text-primary',
          'hover:bg-bg-hover',
        ],
        text: ['text-text-primary data-[hover]:bg-bg-hover'],
        menu: [
          'text-text-primary bg-bg-body hover:text-text-light hover:bg-bg-dark-hover',
        ],
      },
      size: {
        small: 'px-4 leading-8',
      },
    },
  }
);
