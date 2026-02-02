import { type ThemeComponent, cva } from '@marigold/system';

export const TagField: ThemeComponent<'TagField'> = {
  trigger: cva([
    'ui-surface ui-input min-h-input',
    'cursor-pointer',
    'group-invalid/field:ui-state-error',
    'disabled:ui-state-disabled',
    'focus-within:ui-state-focus outline-none',
  ]),
  tags: cva('py-1'),
  listItems: cva('flex flex-wrap gap-1'),
  button: cva([
    'shrink-0 cursor-pointer outline-0',
    'flex items-center justify-center',
  ]),
  icon: cva('text-muted-foreground/80'),
  emptyState: cva('text-placeholder'),
  search: cva('flex flex-col gap-1 p-2'),
  searchInput: cva([
    'ui-surface ui-input',
    'flex items-center gap-1.5',
    'focus-within:ui-state-focus outline-none',
  ]),
  input: cva('w-full bg-transparent outline-none text-sm'),
};
