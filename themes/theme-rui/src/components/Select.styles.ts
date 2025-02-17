import { type ThemeComponent, cva } from '@marigold/system';
import {
  inputContainer,
  inputDisabled,
  inputFocus,
  inputInvalid,
} from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([
    inputContainer,
    inputInvalid,
    inputDisabled,
    inputFocus['focus'],
    'h-input',
    'cursor-pointer',
    '*:data-placeholder:text-placeholder',
  ]),
};
