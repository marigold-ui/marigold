import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'grid size-4 shrink-0 place-content-center rounded',
    'border border-input shadow-sm shadow-black/5',
    'group-disabled/checkbox:opacity-50',
    'outline-offset-2 group-[focus-visible]/checkbox:outline-2 group-[focus-visible]/checkbox:outline-ring/70',
    'group-selected/checkbox:border-brand group-selected/checkbox:bg-brand group-selected/checkbox:text-brand-foreground',
    'group-[indeterminate]/checkbox:border-brand group-[indeterminate]/checkbox:bg-brand group-[indeterminate]/checkbox:text-brand-foreground',
  ]),
  container: cva(''),
  label: cva(
    'text-sm font-normal leading-4 text-foreground group-disabled/checkbox:opacity-70'
  ),
  group: cva(),
};
