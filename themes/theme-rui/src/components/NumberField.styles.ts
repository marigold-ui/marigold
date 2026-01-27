import { type ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'ui-surface h-input',
    'has-invalid:ui-state-error',
    'has-disabled:ui-state-disabled',
    'group-read-only/field:ui-state-readonly',
    'has-focus:ui-state-focus outline-none',
  ]),
  stepper: cva([
    'w-8 h-full text-center shrink-0 grid palce-items-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'ui-input',
    'flex-1',
    'group-data-stepper/field:text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
  ]),
};
