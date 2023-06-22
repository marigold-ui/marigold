import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'border-border-light rounded-sm border border-solid',
    'data-[hover]:border-border-hover',
    'data-[focus]:border-border-focus data-[focus]:shadow-shadow-focus data-[focus]:shadow-[0_0_0_1px]',
    'data-[disabled]:bg-bg-disabled data-[disabled]:text-text-disabled data-[disabled]:cursor-not-allowed ',
    'data-[error]:border-border-error data-[error]:shadow-shadow-error data-[error]:shadow-[0_0_0_1px]',
  ]),
  stepper: cva([
    'text-text-primary w-7',
    'border-border-light border-solid first-of-type:border-r',
    'border-border-light border-solid last-of-type:border-l ',
    'data-[disabled]:text-text-disabled',
    'group-hover/field:border-border-hover',
    'group-error/field:border-border-error',
  ]),
};
