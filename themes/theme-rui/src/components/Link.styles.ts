import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  ' text-blue-700 font-normal aria-[disabled]:cursor-not-allowed',
  {
    variants: {
      variant: {
        secondary: 'font-medium text-foreground underline hover:no-underline',
      },
    },
  }
);
