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
        cta: [
          'h-component rounded-2xl bg-purple-700 px-5 py-1.5',
          'text-sm font-semibold text-purple-100 no-underline',
          'transition-all hover:bg-purple-600',
          'motion-safe:animate-pulse-light',
        ],
      },
    },
  }
);
