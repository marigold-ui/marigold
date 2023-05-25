import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Link: ThemeComponent<'Link'> = cva(
  [
    'text-primary-800',
    'hover:visited:cursor-pointer  hover:underline aria-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        menuItemLink: 'text-root-body  hover:no-underline',
        content: 'hover:no-underline',
      },
    },
  }
);
