import { ThemeComponent, cva } from '@marigold/system';
import { inputBox, inputDisabled, inputSpacing } from './Input.styles';

export const MultiSelect: ThemeComponent<'MultiSelect'> = {
  container: cva([
    inputBox,
    inputSpacing,
    inputDisabled,
    'flex items-center gap-1',
    'has-[input[data-invalid=true]]:border-border-error',
    // 'leading-[22px]',
    'has-[input[data-focused=true]]:outline-outline-focus -outline-offset-1 has-[input[data-focused=true]]:outline has-[input[data-focused=true]]:outline-2',
    // 'read-only:border-transparent read-only:bg-transparent',
  ]),
  input: cva([
    'bg-transparent',
    'leading-[22px]',
    'focus:outline-none outline-none border-0',
    // 'read-only:border-transparent read-only:bg-transparent',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),

  action: cva(''),
  tag: cva([
    'border-border-base bg-bg-base flex items-center gap-1 rounded border ',
    'data-[selected]:bg-bg-selected-input data-[selected]:text-text-inverted data-[selected]:border-border-selected',
    'px-1.5 py-[2px]',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
  icon: cva(
    'absolute right-2 size-4 h-full border-none p-0 bg-transparent disabled:bg-transparent hover:bg-transparent overflow-hidden'
  ),
};
