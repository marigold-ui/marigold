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
    'invalid:focus-within:border-destructive invalid:focus-within:ring-destructive/20',
  ]),
  segment: cva([
    inputDisabled,
    'inline rounded p-0.5 text-foreground caret-transparent outline-0 data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground  data-[type=literal]:text-placeholder ',
    'data-[focused]:bg-focus',
    'invalid:data-[focused]:bg-destructive invalid:data-[focused]:data-[placeholder]:text-destructive-foreground invalid:data-[focused]:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive data-[placeholder]:text-placeholder',
  ]),
  action: cva(
    'fill-muted-foreground disabled:opacity-50 group-error/field:fill-destructive'
  ),
};
