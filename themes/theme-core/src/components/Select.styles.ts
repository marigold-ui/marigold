import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBox,
  inputDisabled,
  inputError,
  inputHeight,
  inputSpacing,
} from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    inputError,
    inputDisabled,
    '[&>[data-placeholder=true]]:text-text-inverted-disabled',
  ]),
};
