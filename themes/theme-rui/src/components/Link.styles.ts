import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  'text-sm aria-[disabled]:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'text-link font-normal',
        secondary: 'font-medium text-foreground underline hover:no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
