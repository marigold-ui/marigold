import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Message: ThemeComponent<'Message'> = {
  container: cva(
    [
      'bg-bg-surface border-y-2 border-l-[16px] border-r-2 border-solid text-sm',
      'items-center px-4 pb-4 pt-2',
    ],
    {
      variants: {
        variant: {
          warning: 'border-border-warning',
          info: 'border-border-info',
          error: 'border-border-error',
        },
      },
    }
  ),
  content: cva('pt-1 leading-[1.125]'),
  icon: cva('flex h-4 w-4', {
    variants: {
      variant: {
        warning: 'fill-fill-warning',
        info: 'fill-fill-info',
        error: 'fill-fill-error',
      },
    },
  }),
  title: cva('pl-1 font-bold leading-[1.125]'),
};
