import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'border-border-light group-hover/checkbox:border-border-hover rounded-sm',
    'group-focus/checkbox:outline-outline-focus group-focus/checkbox:outline group-focus/checkbox:outline-2 group-focus/checkbox:outline-offset-2',
    'group-checked/checkbox:border-border-selected group-checked/checkbox:bg-bg-selected-input group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected-input group-checked/checkbox:text-green-400 group-indeterminate/checkbox:text-green-500',
    'group-disabled/checkbox:bg-bg-disabled group-disabled/:border-border-disabled',
  ]),
  container: cva(),
  label: cva('group-disabled/checkbox:text-text-disabled text-sm '),
};
