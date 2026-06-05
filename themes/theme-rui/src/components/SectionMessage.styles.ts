import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      // Static template with an (optional) description row. Like Toast, the
      // grid has no row gap so empty rows collapse for free; the vertical
      // rhythm is owned by the slots' margins (title `mb-1`, description
      // `mb-2`).
      "grid-cols-[min-content_auto_min-content] gap-x-4 [grid-template-areas:'icon_title_close''icon_description_description''icon_content_content']",
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
  title: cva({ base: 'mb-1 text-sm font-medium' }),
  // Muted relative to title and content (foreground at 80% opacity) while
  // keeping the variant tint for contrast on the tinted backgrounds.
  // `mb-2` pairs the description with the title: 4px (title margin) above,
  // 8px before the content.
  description: cva({
    base: 'mb-2 text-sm leading-5 font-normal',
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
