import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Link: ThemeComponent<'Link'> = cva(
  [
    'text-text-primary',
    'hover:underline  hover:visited:cursor-pointer aria-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        menuItemLink: 'text-text-primary  hover:no-underline',
        content: 'hover:no-underline',
      },
    },
  }
);
