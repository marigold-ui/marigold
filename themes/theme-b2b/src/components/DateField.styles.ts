import { ThemeComponent, cva } from '@marigold/system';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'bg-bg-surface',
    'border-border-light rounded-sm border outline-none',
    'h-[34px] px-2',
    'group-hover/field:border-border-hover',
    'group-readonly/field:group-focus/field:border-border-light group-readonly/field:group-focus/field:outline-none',
    'group-focus/field:border-border-focus group-focus/field:outline-outline-focus group-focus/field:-outline-offset-1',
    ' group-disabled/field:bg-bg-disabled group-disabled/field:border-border-disabled group-disabled/field:text-text-disabled',
    ' group-readonly/field:bg-bg-transparent group-readonly/field:text-text-disabled',
  ]),

  segment: cva(['rounded-sm', 'focus:bg-bg-focus focus:text-white']),

  action: cva(''),
};
