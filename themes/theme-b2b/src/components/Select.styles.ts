import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputError,
  inputFocus,
  inputSpacing,
} from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([
    inputBox,
    inputDisabled,
    inputFocus,
    inputBackground,
    inputSpacing,
    inputError('data-[error]'),
    'appearance-none leading-8',
    'cursor-pointer',
    'aria-expanded:bg-bg-neutral ',
  ]),
};
