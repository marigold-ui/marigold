import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva([
    'flex w-full items-center justify-between gap-1',
    'ui-surface shadow-elevation-border ui-input h-fit min-h-input',
    'cursor-pointer py-1',
    'group-disabled/field:ui-state-disabled',
    'has-focus:ui-state-focus',
    // Need to set error ring manually to override focus ring
    'group-invalid/field:ui-state-error',
    'has-focus:group-invalid/field:ring-destructive/20',
  ]),
  tagGroup: cva('flex flex-1 flex-wrap items-center gap-1'),
  listItems: cva('flex flex-wrap gap-1'),
  button: cva(''),
  container: cva([
    'ui-surface shadow-elevation-border group/tagfield',
    'flex flex-col overflow-hidden gap-1.5 p-2',
    'w-(--tagfield-trigger-width)',
    '[&_div]:shadow-none! [&_div]:border-0!',
  ]),
};
