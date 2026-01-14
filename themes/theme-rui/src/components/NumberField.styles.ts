import { type ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'relative flex items-center h-input',
    'has-disabled:state-disabled',
    'group-read-only/field:state-readonly',
  ]),
  stepper: cva([
    'w-7 h-full text-center shrink-0',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'surface has-default-state:elevation-raised',
    'w-full min-w-0 flex-1',
    'px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)]',
    'text-foreground placeholder:text-placeholder text-sm',
    'outline-none',
    'group-data-stepper/field:text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'has-invalid:surface-has-error',
    'has-focus:state-focus',
  ]),
};
