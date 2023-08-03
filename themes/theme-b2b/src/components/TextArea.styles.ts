import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputError,
  inputFocus,
  inputSpacing,
} from './Input.styles';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  inputBox,
  inputBackground,
  inputFocus,
  inputDisabled,
  inputSpacing,
  inputError('group-error/field'),
  'text-text-body font-body leading-8',
  'read-only:focus:border-border-light read-only:focus:shadow-none',
]);
