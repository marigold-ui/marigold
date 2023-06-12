import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'border-border-light group-hover/checkbox:border-border-hover rounded-sm',
    'group-focus/checkbox:outline-outline-focus group-focus/checkbox:outline group-focus/checkbox:outline-2 group-focus/checkbox:outline-offset-2',
    'group-checked/checkbox:border-border-selected group-checked/checkbox:bg-bg-selected group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected group-checked/checkbox:text-white group-indeterminate/checkbox:text-white',
    'group-disabled/checkbox:bg-bg-disabled group-disabled/:border-border-disabled',
  ]),
  container: cva(),
  label: cva('group-disabled/checkbox:text-text-disabled text-sm '),
};
