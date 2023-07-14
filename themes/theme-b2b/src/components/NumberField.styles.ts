import { ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'border-border-light rounded-sm border border-solid',
    'data-[hover]:border-border-hover',
    'data-[focus]:border-border-focus ',
    'data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled data-[disabled]:cursor-not-allowed ',
    'data-[error]:border-border-error',
  ]),
  stepper: cva([
    'text-text-body w-7',
    'border-border-light border-solid first-of-type:border-r',
    'border-border-light border-solid last-of-type:border-l ',
    'data-[disabled]:text-text-disabled',
    'group-hover/field:border-border-hover',
    'group-error/field:border-border-error',
  ]),
};
