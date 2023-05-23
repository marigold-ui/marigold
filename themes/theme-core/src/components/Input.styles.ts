import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const inputHeight = 'h-[22px]';
export const inputBox = 'border rounded-sm border-input-border bg-white';
export const inputSpacing = 'px-1';

export const Input: ThemeComponent<'Input'> = {
  input: cva([
    inputBox,
    inputHeight,
    inputSpacing,
    'leading-[22px]',
    'focus-within:outline-focus-bg focus-within:outline-2 focus-within:outline -outline-offset-1',
    'disabled:bg-disabled-bg',
    'peer-data-[icon]:pl-6',
  ]),
  icon: cva('left-0.5 h-4 w-4'),
  action: cva(),
};
