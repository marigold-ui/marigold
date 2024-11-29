import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBox,
  inputDisabled,
  inputError,
  inputHeight,
  inputSpacing,
} from './Input.styles';

export const Multiselect: ThemeComponent<'Multiselect'> = {
  container: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    inputDisabled,
    inputError,
    'flex',
    // 'leading-[22px]',
    // 'focus:outline-outline-focus -outline-offset-1 focus:outline focus:outline-2',
    // 'read-only:border-transparent read-only:bg-transparent',
  ]),
  input: cva('flex-1'),
  button: cva(''),
  tag: cva(''),
};
