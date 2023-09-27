import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'border-border-light group-data-[hovered]/checkbox:border-border-hover rounded-sm',
    'group-focus/checkbox:outline-outline-focus group-focus/checkbox:outline group-focus/checkbox:outline-2 group-focus/checkbox:outline-offset-2',
    'group-data-[selected]/checkbox:border-border-selected group-data-[selected]/checkbox:bg-bg-selected-input group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected-input group-indeterminate/checkbox:text-green-500 group-data-[selected]/checkbox:text-green-400',
    'group-disabled/checkbox:bg-bg-disabled group-disabled/:border-border-disabled',
  ]),
  container: cva(),
  label: cva('group-disabled/checkbox:text-text-disabled text-sm '),
};
