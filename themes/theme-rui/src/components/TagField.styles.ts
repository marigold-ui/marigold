import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva({
    base: [
      'flex w-full items-center justify-between gap-1',
      'ui-surface shadow-elevation-border ui-input h-fit min-h-input',
      'cursor-pointer py-1',
      'group-disabled/field:ui-state-disabled',
      'has-focus:ui-state-focus',
      // Need to set error ring manually to override focus ring
      'group-invalid/field:ui-state-error',
      'has-focus:group-invalid/field:ring-destructive/20',
    ],
  }),
  tagGroup: cva({ base: 'flex flex-1 flex-wrap items-center gap-1' }),
  listItems: cva({ base: 'flex flex-wrap gap-1' }),
  button: cva({
    base: [
      'util-touch-hitbox rounded-full [&_svg]:size-4',
      'shrink-0 cursor-pointer outline-0',
      'flex items-center justify-center',
      'hover:bg-hover size-6',
      'focus:ui-state-focus',
      'disabled:ui-state-disabled',
    ],
  }),
  container: cva({
    base: [
      'ui-surface shadow-elevation-border group/tagfield',
      'flex flex-col overflow-hidden gap-1.5 p-2',
      'w-(--tagfield-trigger-width)',
      '[&_div]:shadow-none! [&_div]:border-0!',
    ],
  }),
};
