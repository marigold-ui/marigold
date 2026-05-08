import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] gap-x-4 gap-y-1 [grid-template-areas:'icon_title_close''icon_content_content']",
      'bg-background rounded-md border px-3 py-4',
    ],
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
  }),
  title: cva({ base: 'text-sm font-medium' }),
  content: cva({
    base: 'text-muted-foreground text-sm leading-5 font-normal',
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
  icon: cva({
    base: 'h-6 w-6 align-baseline leading-none -mt-0.5',
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
  close: cva({
    base: [
      'size-8 text-foreground',
      '[&_svg]:size-6',
      '-my-1.5 -me-2', // align button with title
    ],
  }),
};
