import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      "grid-cols-[min-content_auto_min-content] [grid-template-areas:'icon_title_close''icon_description_close''icon_content_close']",
      'ui-surface text-foreground px-3 py-4',
    ],
    // Neutral surface (Toast-aligned, DST-1439) so standard actions/links read
    // correctly. The variant is carried at the edge, away from the content: a
    // muted accent border (accent mixed 50% into the neutral border) via
    // `--ui-border-color`, the hook `ui-surface` reads. No tinted background —
    // a fill would re-introduce the "actions float on a colored surface" problem.
    variants: {
      variant: {
        info: '[--ui-border-color:color-mix(in_oklab,var(--color-info-accent)_50%,var(--color-border))]',
        success:
          '[--ui-border-color:color-mix(in_oklab,var(--color-success-accent)_50%,var(--color-border))]',
        warning:
          '[--ui-border-color:color-mix(in_oklab,var(--color-warning-accent)_50%,var(--color-border))]',
        error:
          '[--ui-border-color:color-mix(in_oklab,var(--color-destructive-accent)_50%,var(--color-border))]',
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
    // `mr-4` (rather than a grid `gap-x`) spaces the icon from the content.
    // The close column carries its own `ml-4` on the button, so when there is
    // no close button the empty column contributes no phantom right gap.
    base: 'mr-4 flex h-5 w-5 items-center justify-center self-start leading-none',
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
