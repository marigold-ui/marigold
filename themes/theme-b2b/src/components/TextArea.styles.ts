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
  inputHover['hover'],
  inputFocus['focus'],
  inputDisabled['disabled'],
  inputError['groupErrorField'],
  inputSpacing,
  'text-text-base font-body leading-8',
  'read-only:focus:border-border-base read-only:focus:outline-hidden',
]);
