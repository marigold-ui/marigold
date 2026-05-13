import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva({
    base: [
      'ui-surface shadow-elevation-border ui-input h-fit min-h-input',
      'cursor-pointer py-1',
      'group-disabled/field:ui-state-disabled',
      '[&:has(>button[data-focus-visible])]:ui-state-focus',
      'group-invalid/field:ui-state-error',
      '[&:has(>button[data-focus-visible])]:group-invalid/field:outline-destructive/20',
      '[&:has(>button[data-focus-visible])]:group-invalid/field:[--ui-border-color:var(--color-destructive)]',
    ],
  }),
  tagGroup: cva({ base: 'flex flex-1 flex-wrap items-center gap-1' }),
  listItems: cva({ base: 'flex flex-wrap gap-1' }),
  container: cva({
    base: [
      'ui-surface shadow-elevation-border group/tagfield',
      'flex flex-col overflow-hidden gap-1.5 p-2',
      'w-(--tagfield-trigger-width)',
      '[&_div]:shadow-none! [&_div]:border-0!',
    ],
  }),
};
