import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  ' text-blue-600 font-normal aria-[disabled]:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: '',
        secondary: 'font-medium text-foreground underline hover:no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
