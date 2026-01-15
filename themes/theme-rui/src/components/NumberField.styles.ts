import { type ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'surface shadow-elevation-base has-default-state:elevation-raised h-input',
    'has-invalid:surface-error',
    'has-disabled:state-disabled',
    'group-read-only/field:state-readonly',
    'has-focus:state-focus outline-none',
  ]),
  stepper: cva([
    'w-8 h-full text-center shrink-0 grid palce-items-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'text-foreground px-3 py-2 text-sm',
    'min-w-0 flex-1 bg-transparent',
    'group-data-stepper/field:text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
  ]),
};
