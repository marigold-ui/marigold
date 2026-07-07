import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] gap-x-4 [grid-template-areas:'icon_title_close''icon_description_description''icon_content_content']",
      'ui-surface text-foreground px-3 py-4',
    ],
    variants: {
      variant: {
        info: 'inset-shadow-[0_0_12px_-6px_color-mix(in_oklab,var(--color-info-accent)_35%,transparent)]',
        success:
          'inset-shadow-[0_0_12px_-6px_color-mix(in_oklab,var(--color-success-accent)_35%,transparent)]',
        warning:
          'inset-shadow-[0_0_12px_-6px_color-mix(in_oklab,var(--color-warning-accent)_35%,transparent)]',
        error:
          'inset-shadow-[0_0_12px_-6px_color-mix(in_oklab,var(--color-destructive-accent)_35%,transparent)]',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }),
  title: cva({ base: 'mb-1 text-sm font-medium' }),
  description: cva({
    base: 'text-secondary mb-2 text-sm leading-5 font-normal',
  }),
  content: cva({
    base: 'text-foreground text-sm leading-5 font-normal',
  }),
  icon: cva({
    base: 'flex h-5 w-5 items-center justify-center self-start leading-none',
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
