import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva({
    base: [
      'grid size-4 shrink-0 place-content-center rounded',
      'border border-input shadow-elevation-border',
      'group-focus-visible/checkbox:ui-state-focus group-focus-visible/checkbox:border-(--ui-border-color) outline-none',
      'group-disabled/checkbox:group-selected/checkbox:bg-disabled group-disabled/checkbox:border-disabled! group-disabled/checkbox:text-disabled-foreground group-disabled/checkbox:cursor-not-allowed',
      'group-selected/checkbox:border-primary group-selected/checkbox:bg-primary group-selected/checkbox:text-primary-foreground',
      'group-[indeterminate]/checkbox:border-primary group-[indeterminate]/checkbox:bg-primary group-[indeterminate]/checkbox:text-primary-foreground',
    ],
  }),
  container: cva({ base: 'cursor-pointer read-only:cursor-default gap-2' }),
  label: cva({
    base: [
      'flex items-center gap-1',
      'text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foreground',
      'group-disabled/checkbox:text-disabled-foreground',
    ],
  }),
  group: cva({ base: 'flex flex-col gap-1' }),
};
