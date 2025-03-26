import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    [
      'grid-cols-[min-content_auto_min-content] gap-x-3 gap-y-1 [grid-template-areas:"icon_title_close""icon_content_content"]',
      'bg-background rounded-md border px-3 py-4',
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
  title: cva('text-sm font-medium'),
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
  close: cva([
    'flex items-center justify-center',
    'rounded-md transition-color size-8 shrink-0 p-0 text-foreground cursor-pointer',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    '-my-1.5 -me-2', // align button with title
    'mixin-ring-focus-visible',
    '[&_svg]:opacity-60 hover:[&_svg]:opacity-100',
  ]),
};
