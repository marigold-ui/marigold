import { type ThemeComponent, cva } from '@marigold/system';
import { inputInvalid, inputReadOnly } from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'mixin-ring-has-focus-visible',
    inputInvalid,
    inputReadOnly,
    'relative inline-flex w-full -mb-0.5 items-center overflow-hidden whitespace-nowrap rounded-lg h-input grow text-center tabular-nums text-foreground',
    'border border-input text-sm shadow-sm shadow-black/5 transition-shadow',
    'data-invalid:data-[focus-within]:border-destructive data-invalid:data-[focus-within]:ring-destructive/20',
  ]),
  stepper: cva([
    'w-7 h-full',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    // Make sure focus ring is only around the component and not the stepper buttons
    'border-input! first-of-type:border-r! last-of-type:border-l!',
  ]),
  input: cva([
    'border-none shadow-none rounded-none text-center',
    'disabled:text-disabled-foreground disabled:bg-disabled',
  ]),
};
