import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'border-border-light group-data-[hovered]/checkbox:border-border-hover rounded-sm',
    'group-focus/checkbox:outline-outline-focus group-focus/checkbox:outline group-focus/checkbox:outline-2 group-focus/checkbox:outline-offset-2',
    'group-[selected]/checkbox:border-border-selected group-[selected]/checkbox:bg-bg-selected-input group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected-input group-indeterminate/checkbox:text-white group-data-[selected]/checkbox:text-white',
    'group-[disabled]/checkbox:group-[selected]/checkbox:border-border-disabled group-[disabled]/checkbox:group-[selected]/checkbox:bg-bg-disabled ',
  ]),
  container: cva(''),
  label: cva('group-[disabled]/checkbox:text-text-disabled text-sm'),
  group: cva(''),
};
