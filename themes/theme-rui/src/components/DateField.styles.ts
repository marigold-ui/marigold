import { type ThemeComponent, cva } from '@marigold/system';
import {
  inputContainer,
  inputDisabled,
  inputInvalid,
  inputReadOnly,
} from './Input.styles';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'h-input',
    inputContainer,
    inputDisabled,
    'has-focus-visible:util-focus-ring outline-none',
    inputInvalid,
    inputReadOnly,
    'invalid:focus-within:border-destructive invalid:focus-within:ring-destructive/20',
    'data-focus-within:util-focus-ring outline-0',
  ]),
  segment: cva([
    inputDisabled,
    'inline rounded p-0.5 text-foreground caret-transparent outline-0 type-literal:px-0 data-focused:data-placeholder:text-foreground data-focused:text-foreground  type-literal:text-placeholder',
    'data-focused:bg-focus',
    'data-placeholder:disabled:text-disabled-foreground',
    'invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive data-placeholder:text-placeholder',
    'group/segment',
    'outline-0',
    'whitespace-pre',
    'data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none',
  ]),
  action: cva(
    'fill-muted-foreground disabled:text-disabled-foreground group-invalid/field:fill-destructive'
  ),
};
