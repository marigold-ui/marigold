import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva([
    'ui-surface ui-input h-fit min-h-input',
    'cursor-pointer py-1',
    'group-invalid/field:ui-state-error',
    'disabled:ui-state-disabled',
    'focus-within:ui-state-focus outline-none',
  ]),
  tags: cva(''),
  listItems: cva('flex flex-wrap gap-1'),
  button: cva([
    'shrink-0 cursor-pointer outline-0',
    'flex items-center justify-center',
  ]),
  icon: cva('text-muted-foreground/80'),
  container: cva([
    'ui-surface shadow-elevation-border group/tagfield',
    'flex flex-col overflow-hidden gap-1.5 p-2',
  ]),
};
