import { ThemeComponent, cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'border-border-dark bg-bg-neutral text-text-dark ease-ease-out h-6 cursor-pointer rounded-sm border px-4 py-0 text-sm leading-6 transition-all duration-200 disabled:cursor-none',
    'disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed',
    'outline-outline-focus outline-2 outline-offset-1 focus-visible:outline',
    'hover:bg-bg-hover-light',
  ],
  {
    variants: {
      variant: {
        primary: [
          'border-border-primary bg-bg-primary  text-text-light',
          'hover:bg-bg-primary-hover hover:border-border-primary-hover ',
        ],
        link: [
          'text-text-primary-light border-none bg-transparent',
          'hover:bg-transparent hover:underline',
        ],
        text: ['border-none bg-transparent', 'hover:bg-bg-hover-light'],
        icon: ['h-auto px-0'],
      },
      size: {
        small: 'py-1',
      },
    },
  }
);
