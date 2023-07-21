import { ThemeComponent, cva } from '@marigold/system';

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
  title: cva('font-bold'),
  content: cva(''),
  icon: cva('', {
    variants: {
      variant: {
        warning: 'text-fill-warning',
        info: 'text-fill-info',
        error: 'text-fill-error',
      },
    },
  }),
};
