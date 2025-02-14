import { type ThemeComponent, cva } from '@marigold/system';
import {
  inputContainer,
  inputDisabled,
  inputFocus,
  inputInvalid,
  inputReadOnly,
} from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'h-input',
    inputContainer,
    inputDisabled,
    inputFocus['focus-within'],
    inputInvalid,
    inputReadOnly,
    'data-invalid:data-[focus-within]:border-destructive data-invalid:data-[focus-within]:ring-destructive/20',
  ]),
  segment: cva([
    inputDisabled,
    'inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground  data-[type=literal]:text-placeholder ',
    'data-[focused]:bg-accent',
    'data-[invalid]:data-[focused]:bg-destructive data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-placeholder',
  ]),
  action: cva(
    'fill-muted-foreground disabled:opacity-50 group-error/field:fill-destructive'
  ),
};
