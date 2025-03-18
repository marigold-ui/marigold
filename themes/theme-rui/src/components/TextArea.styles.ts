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
  'mixin-ring-focus-visible',
  inputDisabled,
  inputReadOnly,
  'invalid:text-destructive',
]);
