import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva({
    base: [
      'grid size-4 shrink-0 place-content-center rounded',
      'border border-border shadow-elevation-border',
      'group-focus-visible/checkbox:ui-state-focus group-focus-visible/checkbox:border-(--ui-border-color) outline-none',
      'group-disabled/checkbox:group-selected/checkbox:bg-disabled-surface group-disabled/checkbox:border-disabled-surface! group-disabled/checkbox:text-disabled group-disabled/checkbox:cursor-not-allowed',
      'group-selected/checkbox:border-selected-bold group-selected/checkbox:bg-selected-bold group-selected/checkbox:text-selected-bold-foreground',
      'group-[indeterminate]/checkbox:border-selected-bold group-[indeterminate]/checkbox:bg-selected-bold group-[indeterminate]/checkbox:text-selected-bold-foreground',
      'group-hover/checkbox:group-disabled/checkbox:bg-disabled-surface',
    ],
  }),
  container: cva({ base: 'cursor-pointer read-only:cursor-default gap-2' }),
  label: cva({
    base: [
      'flex items-center gap-1',
      'text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foreground',
      'group-disabled/checkbox:text-disabled',
    ],
  }),
  group: cva({ base: 'flex flex-col gap-1' }),
};
