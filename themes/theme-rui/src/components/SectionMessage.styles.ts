import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    [
      'grid-cols-[min-content_auto_min-content] gap-x-4 gap-y-2 [grid-template-areas:"icon_title_close""icon_content_content"]',
      'bg-background z-50 max-w-[601px] rounded-md border p-4',
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
  title: cva('text-base leading-5 font-bold'),
  content: cva('text-muted-foreground text-sm leading-5 font-normal', {
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
  icon: cva('h-4 w-4 align-baseline leading-none pt-0.5', {
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
  close: cva(
    'h-[9.98px] w-[9.98px] cursor-pointer border-none p-0 leading-normal outline-0'
  ),
};
