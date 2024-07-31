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

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([
    inputBox,
    inputDisabled(),
    inputFocus(),
    inputError('group-error/field'),
    inputHover(),
    inputBackground,
    inputSpacing,
    'appearance-none leading-8',
    'cursor-pointer',
    '[&>[data-placeholder=true]]:text-text-base-disabled',
    'aria-expanded:bg-bg-base-active ',
  ]),
};
