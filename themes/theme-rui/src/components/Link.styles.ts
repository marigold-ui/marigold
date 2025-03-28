import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  'underline aria-[disabled]:cursor-not-allowed py-2 underline-offset-4',
  {
    variants: {
      variant: {
        menuItemLink: '',
        secondary: '',
      },
    },
  }
);
