import { ThemeComponent, cva } from '@marigold/system';
import {
  inputBackground,
  inputBox,
  inputDisabled,
  inputHover,
  inputSpacing,
} from './Input.styles';

export const MultiSelect: ThemeComponent<'MultiSelect'> = {
  field: cva('grid gap-y-0.5'),
  container: cva([
    inputBox,
    inputBackground,
    inputDisabled('aria-disabled'),
    inputHover(),
    inputSpacing,
    'aria-disabled:bg-bg-base-disabled aria-disabled:text-text-base-disabled aria-disabled:hover:border-border-base-disabled aria-disabled:border-border-base-disabled aria-disabled:cursor-not-allowed',
    'has-[input[data-invalid=true]]:border-border-error',
    '[&>*:first-child]:p-0',
    // Using !important to override react-select styles
    'has-[input[data-focused=true]]:!outline-outline-focus has-[input[data-focused=true]]:border-none has-[input[data-focused=true]]:shadow-none -outline-offset-1 has-[input[data-focused=true]]:!outline has-[input[data-focused=true]]:!outline-2',
    'has-[input[aria-readonly=true]]:focus:!border-border-base read-only:focus:!outline-none',
  ]),

  input: cva([
    'bg-transparent flex-1 h-full',
    'leading-loose',
    'data-[focused]:outline-none outline-none border-0',
    'disabled:cursor-not-allowed',
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-8',
    'placeholder:text-text-inverted-disabled',
  ]),

  action: cva(''),
  tag: cva([
    'border-border-base bg-transparent ',
    'flex items-center gap-1 ',
    'rounded-md border p-1 m-0 ',
  ]),
  closeButton: cva(
    'size-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
  icon: cva('left-1'),
  listContainer: cva([
    'my-0.5 rounded-sm',
    'border-border-inverted border bg-white',
  ]),
  list: cva('pointer-events-auto'),
  option: cva([
    'font-body text-[13px] text-text-base',
    'flex flex-col',
    '[&:not([aria-disabled=true])]:hover:text-text-inverted [&:not([aria-disabled=true])]:hover:bg-highlight',
    'cursor-pointer px-1.5 py-0.5 outline-none',
    '[&.isFocused:not([aria-disabled=true])]:text-text-inverted [&.isFocused[aria-disabled=true]]:bg-transparent [&.isFocused:not([aria-disabled=true])]:bg-highlight',
    'rac-selected:text-text-inverted aria-selected:bg-highlight',
    'aria-disabled:text-text-base-disabled aria-disabled:cursor-not-allowed',
  ]),
  valueContainer: cva('gap-2'),
};
