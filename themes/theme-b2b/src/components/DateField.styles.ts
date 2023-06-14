import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'bg-bg-surface',
    'border-border-light rounded-sm border outline-none',
    'px-2 leading-[2]',
    'group-hover/field:border-border-hover',
    'group-focus/field:border-border-focus group-focus/field:outline-outline-focus group-focus/field:-outline-offset-1',
    ' group-disabled/field:bg-bg-disabled group-disabled/field:border-border-disabled group-disabled/field:text-text-disabled',
    ' group-readonly/field:bg-bg-transparent group-readonly/field:text-text-disabled',
  ]),

  segment: cva(['rounded-sm', 'focus:bg-[#3875d7] focus:text-white']),

  action: cva('pr-2'),
};
