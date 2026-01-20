import { type ThemeComponent, cva } from '@marigold/system';
import { inputInvalid, inputReadOnly } from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'rounded-lg h-input bg-background',
    'has-focus-visible:util-focus-ring outline-none',
    inputInvalid,
    inputReadOnly,
    'border border-input text-sm shadow-xs transition-shadow',
    'data-invalid:data-[focus-within]:border-destructive data-invalid:data-[focus-within]:ring-destructive/20',
  ]),
  stepper: cva([
    'w-7 h-full text-center shrink-0',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'tabular-nums text-foreground px-3 py-2',
    'w-full flex-1 bg-transparent',
    'group-[[data-stepper]]/field:text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
  ]),
};
