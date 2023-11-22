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
          success: 'border-border-success',
          warning: 'border-border-warning',
          info: 'border-border-info',
          error: 'border-border-error',
        },
      },
    }
  ),
  title: cva('font-bold'),
  content: cva('col-span-2 col-start-1'),
  icon: cva('h-4 w-4', {
    variants: {
      variant: {
        success: 'text-text-success',
        warning: 'text-text-warning',
        info: 'text-text-info',
        error: 'text-text-error',
      },
    },
  }),
};
