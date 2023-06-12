import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Link: ThemeComponent<'Link'> = cva(
  ['text-text-link', 'hover:no-underline aria-[disabled]:cursor-not-allowed'],
  {
    variants: {
      variant: {
        menuItemLink: 'text-text-hover-light hover:no-underline',
      },
    },
  }
);
