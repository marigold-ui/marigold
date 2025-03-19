import { type ThemeComponent, cva } from '@marigold/system';
import { inputInvalid } from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva([
    'mixin-ring-focus-within',
    inputInvalid,
    'relative inline-flex w-full -mb-0.5 items-center overflow-hidden whitespace-nowrap rounded-lg h-input grow text-center tabular-nums text-foreground',
    'border border-input text-sm shadow-sm shadow-black/5 transition-shadow',
    'data-invalid:data-[focus-within]:border-destructive data-invalid:data-[focus-within]:ring-destructive/20',
  ]),
  stepper: cva([
    'w-7 h-full',
    'disabled:text-disabled-foreground disabled:bg-disabled',
    'border-input border-solid first-of-type:border-r',
    'border-input border-solid last-of-type:border-l ',
  ]),
  input: cva(
    'border-none shadow-none rounded-none outline-offset-0 text-center focus-visible:ring-0'
  ),
};
