import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Input: ThemeComponent<'Input'> = {
  icon: cva('left-2'),
  action: cva('right-0'),
  input: cva([
    'bg-bg-surface',
    'border-border-light rounded-sm border  outline-none',
    'px-2 leading-[2]',
    'hover:border-border-hover',
    'focus:border-border-focus focus:outline-outline-focus focus:-outline-offset-1',
    'disabled:bg-bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed ',
    'data-[error]:border-border-error data-[error]:outline-outline-error data-[error]:-outline-offset-1',
    // Extra padding for when an icon/action is present
    'group-data-[icon]/input:pl-8',
  ]),
};
