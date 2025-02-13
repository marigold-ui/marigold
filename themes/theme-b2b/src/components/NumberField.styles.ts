import { ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'border-border-base rounded-sm border border-solid',
    'group-hover/field:border-border-base-hover',
    'group-readonly/field:group-focus/field:border-border-base group-readonly/field:group-focus/field:shadow-none',
    'group-disabled/field:bg-bg-base-disabled group-disabled/field:text-text-base-disabled group-disabled/field:cursor-not-allowed ',
    'data-[focus-within]:outline-outline-focus data-[focus-within]:outline',
    'outline-2 -outline-offset-1 ',
    'group-error/field:border-border-error ',
  ]),
  stepper: cva([
    'text-text-base w-7',
    'border-border-base border-solid first-of-type:border-r',
    'border-border-base border-solid last-of-type:border-l ',
  ]),
  input: cva(['rounded-none border-none outline-offset-0']),
};
