import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  [
    'text-text-link',
    'hover:underline  hover:visited:cursor-pointer aria-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        menuItemLink: 'text-text-base  hover:no-underline',
        content: 'hover:no-underline',
      },
    },
  }
);
