import { type ThemeComponent, cva } from '@marigold/system';
import { inputInvalid, inputReadOnly } from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'rounded-lg h-input',
    'mixin-ring-has-focus-visible',
    inputInvalid,
    inputReadOnly,
    'border border-input text-sm shadow-sm shadow-black/5 transition-shadow',
    'data-invalid:data-[focus-within]:border-destructive data-invalid:data-[focus-within]:ring-destructive/20',
  ]),
  stepper: cva([
    'w-7 h-full text-center shrink-0',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'tabular-nums text-foreground px-3 py-2',
    'min-w-0 flex-1',
    'group-[[data-stepper]]/field:text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
  ]),
};
