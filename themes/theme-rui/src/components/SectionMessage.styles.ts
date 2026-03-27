import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] gap-x-4 gap-y-1 [grid-template-areas:'icon_title_close''icon_content_content']",
      'bg-surface rounded-md border px-3 py-4',
    ],
    variants: {
      variant: {
        success: 'border-success-accent bg-success text-success-foreground',
        warning: 'border-warning-accent bg-warning text-warning-foreground',
        info: 'border-info-accent bg-info text-info-foreground',
        error:
          'border-destructive-accent bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  title: cva({ base: 'text-sm font-medium' }),
  content: cva({
    base: 'text-secondary text-sm leading-5 font-normal',
    variants: {
      variant: {
        success: 'text-success-foreground',
        warning: 'text-warning-foreground',
        info: 'text-info-foreground',
        error: 'text-destructive-foreground',
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
        success: 'text-success-accent',
        warning: 'text-warning-accent',
        info: 'text-info-accent',
        error: 'text-destructive-accent',
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
