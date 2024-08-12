import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  ['text-text-link', 'hover:no-underline aria-[disabled]:cursor-not-allowed'],
  {
    variants: {
      variant: {
        menuItemLink: 'text-text-base hover:no-underline',
        secondary: [
          'px-8 leading-[48px]',
          'text-text-inverted bg-bg-brand hover:bg-bg-brand-hover',
        ],
      },
    },
  }
);
