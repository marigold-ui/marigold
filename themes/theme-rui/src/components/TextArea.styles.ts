import { type ThemeComponent, cva } from '@marigold/system';
import {
  inputContainer,
  inputDisabled,
  inputInvalid,
  inputReadOnly,
} from './Input.styles';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  inputContainer,
  inputInvalid,
  'focus-visible:util-focus-ring',
  inputDisabled,
  inputReadOnly,
  'invalid:text-destructive',
]);
