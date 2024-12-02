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
    'has-[input[data-focused=true]]:outline-outline-focus -outline-offset-1 has-[input[data-focused=true]]:outline has-[input[data-focused=true]]:outline-2',
    // 'read-only:border-transparent read-only:bg-transparent',
  ]),
  input: cva('flex-1 data-focused:outline-none outline-none ring-0'),
  button: cva(''),
  tag: cva(''),
};
