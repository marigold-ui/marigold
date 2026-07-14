import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva({
    base: [
      // `tagfield-trigger` is a plain marker (not a utility): Tag reads it via an
      // `in-[.tagfield-trigger]` context selector to quiet its chips inside the
      // frame — see Tag.styles.ts.
      'tagfield-trigger',
      'ui-control ui-input h-fit min-h-control',
      'cursor-pointer py-1',
      'group-disabled/field:ui-state-disabled',
      '[&:has(>button[data-focus-visible])]:ui-state-focus',
      'group-invalid/field:ui-state-error',
      '[&:has(>button[data-focus-visible])]:group-invalid/field:outline-destructive-accent/20',
      '[&:has(>button[data-focus-visible])]:group-invalid/field:[--ui-border-color:var(--color-destructive)]',
    ],
  }),
  tagGroup: cva({ base: 'flex flex-1 flex-wrap items-center gap-1' }),
  listItems: cva({ base: 'flex flex-wrap gap-1' }),
  container: cva({
    base: [
      // Rendered inside the Popover, which paints the overlay surface; this is
      // just the dropdown's inner layout.
      'group/tagfield',
      'flex flex-col overflow-hidden gap-1.5 p-2',
      'w-(--tagfield-trigger-width)',
    ],
  }),
};
