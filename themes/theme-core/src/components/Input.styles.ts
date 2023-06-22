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
    'focus:outline-outline-focus -outline-offset-1 focus:outline focus:outline-2',
    'disabled:bg-bg-disabled disabled:border-border-disabled disabled:text-text-disabled',
    'read-only:border-transparent read-only:bg-transparent',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-5',
    'group-data-[action]/input:pr-4',
  ]),
  icon: cva('left-0.5 h-4 w-4'),
  action: cva([inputHeight, 'right-0 w-4']),
};
