import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'grid size-4 shrink-0 place-content-center rounded',
    'border border-input shadow-sm shadow-black/5',
    'group-disabled/checkbox:border-disabled',
    'mixin-ring-focus-visible-checkbox',
    'group-selected/checkbox:border-brand group-selected/checkbox:bg-brand group-selected/checkbox:text-brand-foreground',
    'group-[indeterminate]/checkbox:border-brand group-[indeterminate]/checkbox:bg-brand group-[indeterminate]/checkbox:text-brand-foreground',
  ]),
  container: cva(),
  label: cva(
    'text-sm leading-4 group-[group="checkbox"]/checkboxgroup:font-normal font-medium text-foreground group-disabled/checkbox:text-disabled-foreground'
  ),
  group: cva(),
};
