import { ThemeComponent, cva } from '@marigold/system';

export const Link: ThemeComponent<'Link'> = cva(
  ['font-medium underline underline-offset-4'],
  {
    variants: {
      variant: {
        toc: [
          'text-secondary-500 hover:text-secondary-800 text-xs no-underline',
          'data-[active=true]:text-secondary-800 font-normal data-[active=true]:font-medium',
        ],
      },
    },
  }
);
