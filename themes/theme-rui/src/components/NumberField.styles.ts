import { type ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva({
    base: [
      'ui-surface shadow-elevation-border h-input',
      'has-invalid:ui-state-error',
      'group-data-disabled/field:ui-state-disabled',
      'group-read-only/field:ui-state-readonly',
      'has-focus:ui-state-focus outline-none',
    ],
  }),
  stepper: cva({
    base: [
      'w-8 h-full text-center shrink-0 grid palce-items-center',
      'text-foreground',
      'disabled:text-disabled-foreground disabled:bg-disabled',
      'border-input!',
      'first-of-type:border-r! first-of-type:rounded-l-[calc(var(--radius-lg)-1px)]',
      'last-of-type:border-l! last-of-type:rounded-r-[calc(var(--radius-lg)-1px)]',
    ],
  }),
  input: cva({
    base: [
      'ui-input',
      'flex-1',
      'group-data-stepper/field:text-center',
      'disabled:text-disabled-foreground disabled:bg-disabled',
    ],
  }),
};
