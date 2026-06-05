import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] gap-x-4 gap-y-1 [grid-template-areas:'icon_title_close''icon_description_description''icon_content_content']",
      'bg-surface rounded-md border px-3 py-4',
    ],
    variants: {
      variant: {
        info: 'border-info-accent bg-info text-info-foreground',
        success: 'border-success-accent bg-success text-success-foreground',
        warning: 'border-warning-accent bg-warning text-warning-foreground',
        error:
          'border-destructive-accent bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  title: cva({ base: 'text-sm font-medium' }),
  // Muted relative to title and content (foreground at 80% opacity) while
  // keeping the variant tint for contrast on the tinted backgrounds.
  description: cva({
    base: 'text-sm leading-5 font-normal',
    variants: {
      variant: {
        info: 'text-info-foreground/80',
        success: 'text-success-foreground/80',
        warning: 'text-warning-foreground/80',
        error: 'text-destructive-foreground/80',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  content: cva({
    base: 'text-secondary text-sm leading-5 font-normal',
    variants: {
      variant: {
        info: 'text-info-foreground',
        success: 'text-success-foreground',
        warning: 'text-warning-foreground',
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
        info: 'text-info-accent',
        success: 'text-success-accent',
        warning: 'text-warning-accent',
        error: 'text-destructive-accent',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
};
