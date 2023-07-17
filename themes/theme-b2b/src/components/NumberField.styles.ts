import { ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'border-border-light rounded-sm border border-solid',
    'hover:border-border-hover',
    'group-readonly/field:group-focus/field:border-border-light group-readonly/field:group-focus/field:shadow-none',
    'group-focus/field:border-border-focus ',
    'group-disabled/field:bg-bg-disabled group-disabled/field:text-text-disabled group-disabled/field:cursor-not-allowed ',
    'group-error/field:border-border-error',
  ]),
  stepper: cva([
    'text-text-body w-7',
    'border-border-light border-solid first-of-type:border-r',
    'border-border-light border-solid last-of-type:border-l ',
  ]),
};
