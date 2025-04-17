import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'grid size-4 shrink-0 place-content-center rounded',
    'border border-input shadow-sm shadow-black/5',
    'group-focus-visible/checkbox:utility-focus-ring',
    'group-disabled/checkbox:bg-disabled! group-disabled/checkbox:border-disabled! group-disabled/checkbox:text-disabled-foreground group-disabled/checkbox:cursor-not-allowed',
    'group-selected/checkbox:border-brand group-selected/checkbox:bg-brand group-selected/checkbox:text-brand-foreground',
    'group-[indeterminate]/checkbox:border-brand group-[indeterminate]/checkbox:bg-brand group-[indeterminate]/checkbox:text-brand-foreground',
  ]),
  container: cva('cursor-pointer read-only:cursor-default'),
  label: cva(
    'text-sm leading-4 group-[group="checkbox"]/checkboxgroup:font-normal font-medium text-foreground group-disabled/checkbox:text-disabled-foreground'
  ),
  group: cva(),
};
