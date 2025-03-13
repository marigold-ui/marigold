import { type ThemeComponent, cva } from '@marigold/system';
import {
  inputContainer,
  inputDisabled,
  inputFocus,
  inputInvalid,
  inputReadOnly,
} from './Input.styles';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  inputContainer,
  inputInvalid,
  inputFocus['focus'],
  inputDisabled,
  inputReadOnly,
  'invalid:text-destructive',
]);
