import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputError,
  inputFocus,
  inputHover,
  inputSpacing,
} from './Input.styles';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  inputBox,
  inputBackground,
  inputHover(),
  inputFocus(),
  inputDisabled(),
  inputError('group-error/field'),
  inputSpacing,
  'text-text-base font-body leading-8',
  'read-only:focus:border-border-base read-only:focus:outline-none',
]);
