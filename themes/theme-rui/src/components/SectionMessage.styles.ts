import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] gap-x-4 [grid-template-areas:'icon_title_close''icon_description_description''._content_content']",
      // Built on the shared `ui-surface` primitive (neutral fill + subtle
      // border + rounded-surface), like Card/Panel/Toast, so the surface stays
      // consistent with the rest of the system. The variant is carried by a
      // soft per-variant colored *inset* glow (see below) that hugs the inner
      // edge and fades to the neutral fill, keeping body text at full contrast.
      // No elevation shadow, so it reads as the flat, in-flow cousin of the
      // floating `<Toast>` rather than a twin.
      'ui-surface text-foreground px-3 py-4',
    ],
    variants: {
      variant: {
        info: 'shadow-[inset_0_0_12px_-6px_color-mix(in_oklab,var(--color-info-accent)_35%,transparent)]',
        success:
          'shadow-[inset_0_0_12px_-6px_color-mix(in_oklab,var(--color-success-accent)_35%,transparent)]',
        warning:
          'shadow-[inset_0_0_12px_-6px_color-mix(in_oklab,var(--color-warning-accent)_35%,transparent)]',
        error:
          'shadow-[inset_0_0_12px_-6px_color-mix(in_oklab,var(--color-destructive-accent)_35%,transparent)]',
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
