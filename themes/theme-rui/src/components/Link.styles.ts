import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  [
    'text-text-link hover:underline aria-[disabled]:cursor-not-allowed py-2 underline-offset-5',
  ],
  {
    variants: {
      variant: {
        menuItemLink: '',
        secondary: '',
      },
    },
  }
);
