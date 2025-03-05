import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    [
      'grid-cols-[min-content_auto_min-content] gap-3 [grid-template-areas:"icon_title_close""icon_content_content"]',
      //'bg-bg-surface border-y-2 border-l-[16px] border-r-2 border-solid text-sm',
      //'items-center px-4 pb-4 pt-2',
      'bg-background z-50 max-w-[400px] rounded-md border p-4 shadow-lg ',
    ],
    {
      variants: {
        variant: {
          success: 'border-border',
          warning: 'border-border',
          info: 'border-border',
          error: 'border-border',
        },
      },
      defaultVariants: {
        variant: 'info',
      },
    }
  ),
  title: cva('text-sm font-medium leading-none'),
  content: cva('text-muted-foreground text-sm'),
  icon: cva('', {
    variants: {
      variant: {
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
        error: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
};
