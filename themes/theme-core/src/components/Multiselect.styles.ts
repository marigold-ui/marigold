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
    'min-h-6',
    '[&>*:first-child]:p-0',
    'aria-disabled:bg-bg-inverted-disabled aria-disabled:border-border-base-disabled aria-disabled:text-text-base-disabled aria-disabled:cursor-not-allowed',
    'flex items-center gap-1',
    'has-[input[data-invalid=true]]:border-border-error',
    'leading-[22px]',
    'has-[input[data-focused=true]]:outline-outline-focus -outline-offset-1 has-[input[data-focused=true]]:outline has-[input[data-focused=true]]:outline-1',
    'overflow-hidden has-[input[aria-readonly=true]]:border-transparent has-[input[aria-readonly=true]]:bg-transparent',
  ]),

  input: cva([
    'bg-transparent flex-1 h-full',
    'leading-[22px]',
    'data-[focused]:outline-hidden outline-hidden border-0',
    'disabled:cursor-not-allowed',
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),

  action: cva(''),
  tag: cva([
    '[&>*:first-child]:h-full [&>*:first-child]:flex [&>*:first-child]:items-center',
    'px-1.5 py-[2px] h-5',
    'border-border-base bg-bg-base flex items-center gap-1 rounded border ',
  ]),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
  icon: cva(
    'absolute top-0 right-2 size-4 h-full border-none p-0 bg-transparent disabled:bg-transparent hover:bg-transparent overflow-hidden'
  ),
  listContainer: cva([
    'my-0.5 rounded-xs',
    'border-border-inverted border bg-white',
  ]),
  list: cva('p-0 pointer-events-auto'),
  option: cva([
    'font-body text-[13px] text-text-base',
    'flex flex-col',
    '[&:not([aria-disabled=true])]:hover:!text-text-base [&:not([aria-disabled=true])]:hover:!bg-linear-to-t from-highlight-start/80 to-highlight-end/90',
    'cursor-pointer px-1.5 py-0.5 outline-hidden',
    '[&.isFocused:not([aria-disabled=true])]:text-text-inverted [&.isFocused[aria-disabled=true]]:bg-transparent [&.isFocused:not([aria-disabled=true])]:bg-linear-to-t',
    'rac-selected:text-text-inverted aria-selected:bg-highlight',
    'aria-disabled:text-text-base-disabled aria-disabled:cursor-not-allowed',
  ]),
  valueContainer: cva('gap-1 '),
};
