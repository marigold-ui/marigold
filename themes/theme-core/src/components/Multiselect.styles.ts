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
    'flex items-center gap-1',
    // 'leading-[22px]',
    'has-[input[data-focused=true]]:outline-outline-focus -outline-offset-1 has-[input[data-focused=true]]:outline has-[input[data-focused=true]]:outline-2',
    // 'read-only:border-transparent read-only:bg-transparent',
  ]),
  input: cva('flex-1 data-focused:outline-none outline-none ring-0'),
  button: cva(''),
  tag: cva([
    'border-border-base bg-bg-base flex items-center gap-1 rounded border ',
    'data-[selected]:bg-bg-selected-input data-[selected]:text-text-inverted data-[selected]:border-border-selected',
    'px-1.5 py-[2px] h-4',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
};
