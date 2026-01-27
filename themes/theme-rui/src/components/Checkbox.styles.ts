import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'grid size-4 shrink-0 place-content-center rounded',
    'border border-input shadow-xs',
    'group-focus-visible/checkbox:state-focus outline-none',
    'group-disabled/checkbox:group-selected/checkbox:bg-disabled group-disabled/checkbox:border-disabled! group-disabled/checkbox:text-disabled-foreground group-disabled/checkbox:cursor-not-allowed',
    'group-selected/checkbox:border-brand group-selected/checkbox:bg-brand group-selected/checkbox:text-brand-foreground',
    'group-[indeterminate]/checkbox:border-brand group-[indeterminate]/checkbox:bg-brand group-[indeterminate]/checkbox:text-brand-foreground',
  ]),
  container: cva('cursor-pointer read-only:cursor-default gap-2'),
  label: cva([
    'flex items-center gap-1',
    'text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foregroun',
    'group-disabled/checkbox:text-disabled-foreground',
  ]),
  group: cva(),
};
