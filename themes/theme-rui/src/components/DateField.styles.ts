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
    inputFocus,
    inputInvalid,
    inputReadOnly,
  ]),
  segment: cva([]),
  action: cva(''),
};
