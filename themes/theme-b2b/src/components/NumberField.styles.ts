import { ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'border-border-light rounded-sm border border-solid',
    'group-hover/field:border-border-hover',
    'group-readonly/field:group-focus/field:border-border-light group-readonly/field:group-focus/field:shadow-none',
    'group-disabled/field:bg-bg-disabled group-disabled/field:text-text-disabled group-disabled/field:cursor-not-allowed ',
    'data-[focus-within]:outline-outline-focus data-[focus-within]:outline',
    'outline-2 -outline-offset-1 ',
  ]),
  stepper: cva([
    'text-text-body w-7',
    'border-border-light border-solid first-of-type:border-r',
    'border-border-light border-solid last-of-type:border-l ',
    'group-error/field:outline-outline-error group-error/field:outline',
  ]),
};
