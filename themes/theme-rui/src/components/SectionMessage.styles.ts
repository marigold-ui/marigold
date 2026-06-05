import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      // Static template with an (optional) description row. Like Toast, the
      // grid has no row gap so empty rows collapse for free; the vertical
      // rhythm is owned by the slots' margins (title `mb-1`, description
      // `mb-2`).
      "grid-cols-[min-content_auto_min-content] gap-x-4 [grid-template-areas:'icon_title_close''icon_description_description''icon_content_content']",
      // Each variant assigns the description color via `--section-message-description`
      // (same mechanism as the Card master/admin `--card-text` variable).
      'bg-surface rounded-md border px-3 py-4 [--section-message-description:currentColor]',
    ],
    variants: {
      variant: {
        info: 'border-info-accent bg-info text-info-foreground [--section-message-description:var(--color-info-foreground)]',
        success:
          'border-success-accent bg-success text-success-foreground [--section-message-description:var(--color-success-foreground)]',
        warning:
          'border-warning-accent bg-warning text-warning-foreground [--section-message-description:var(--color-warning-foreground)]',
        error:
          'border-destructive-accent bg-destructive text-destructive-foreground [--section-message-description:var(--color-destructive-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  title: cva({ base: 'mb-1 text-sm font-medium' }),
  // Consumes the variant's `--section-message-description` color, muted to
  // 80% so the description reads quieter than title and content. `mb-2`
  // pairs the description with the title: 4px (title margin) above, 8px
  // before the content.
  description: cva({
    base: 'text-(--section-message-description)/80 mb-2 text-sm leading-5 font-normal',
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
