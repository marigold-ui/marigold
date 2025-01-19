import { ThemeComponent, cva } from '@marigold/system';
import { inputBox, inputHeight, inputSpacing } from './Input.styles';

export const MultiSelect: ThemeComponent<'MultiSelect'> = {
  field: cva(
    'grid grid-cols-[min-content_1fr] grid-rows-[min-content_min-content] gap-x-2 gap-y-0.5'
  ),
  container: cva([
    inputBox,
    inputSpacing,
    inputHeight,
    // to override react-select height
    'min-h-6 ',
    '[&>*:first-child]:p-0',
    'has-[input:disabled]:bg-bg-inverted-disabled has-[input:disabled]:border-border-base-disabled has-[input:disabled]:text-text-base-disabled has-[input:disabled]:cursor-not-allowed',
    'flex items-center gap-1',
    'has-[input[data-invalid=true]]:border-border-error',
    'leading-[22px]',
    'has-[input[data-focused=true]]:outline-outline-focus -outline-offset-1 has-[input[data-focused=true]]:outline has-[input[data-focused=true]]:outline-2',
    'overflow-hidden has-[input[readonly]]:border-transparent has-[input[readonly]]:bg-transparent',
  ]),
  input: cva([
    'bg-transparent flex-1 h-full',
    'leading-[22px]',
    'data-[focused]:outline-none outline-none border-0',
    'disabled:cursor-not-allowed',
    // 'read-only:border-transparent read-only:bg-transparent',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),

  action: cva(''),
  tag: cva([
    '[&>*:first-child]:h-full [&>*:first-child]:flex [&>*:first-child]:items-center',
    'px-1.5 py-[2px] h-5',
    'border-border-base bg-bg-base flex items-center gap-1 rounded border ',
    'data-[selected]:bg-bg-selected-input data-[selected]:text-text-inverted data-[selected]:border-border-selected',
  ]),
  listItems: cva('flex flex-wrap items-center gap-1'),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
  icon: cva(
    'absolute right-2 size-4 h-full border-none p-0 bg-transparent disabled:bg-transparent hover:bg-transparent overflow-hidden'
  ),
};
