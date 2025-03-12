import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    [
      'grid-cols-[min-content_auto_min-content] gap-4 [grid-template-areas:"icon_title_close""icon_content_content"]',
      //'bg-bg-surface border-y-2 border-l-[16px] border-r-2 border-solid text-sm',
      //'items-center px-4 pb-4 pt-2',
      'bg-background z-50 max-w-[400px] rounded-md border p-4',
    ],
    {
      variants: {
        variant: {
          success:
            'border-success-muted-accent bg-success-muted text-success-muted-foreground',
          warning:
            'border-warning-muted-accent bg-warning-muted text-warning-muted-foreground',
          info: 'border-info-muted-accent bg-info-muted text-info-muted-foreground',
          error:
            'border-destructive-muted-accent bg-destructive-muted text-destructive-muted-foreground',
        },
      },
      defaultVariants: {
        variant: 'info',
      },
    }
  ),
  title: cva('text-sm font-medium leading-none'),
  content: cva('text-muted-foreground text-sm', {
    variants: {
      variant: {
        success: 'text-success-muted-foreground',
        warning: 'text-warning-muted-foreground',
        info: 'text-info-muted-foreground',
        error: 'text-destructive-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  icon: cva('', {
    variants: {
      variant: {
        success: 'text-success-muted-accent',
        warning: 'text-warning-muted-accent',
        info: 'text-info-muted-accent',
        error: 'text-destructive-muted-accent',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
};
