import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Select: ThemeComponent<'Select'> = {
  icon: cva(),
  select: cva([
    'appearance-none leading-8',
    'px-2',
    'bg-bg-surface border-border-light rounded-sm border',
    'cursor-pointer outline-none',
    'hover:border-border-hover',
    'disabled:border-border-disabled disabled:text-text-disabled disabled:bg-bg-disabled disabled:cursor-not-allowed',
    'focus-visible:border-border-focus focus-visible:shadow-shadow-focus shadow-[0_0_0_1px]',
    'aria-expanded:bg-bg-neutral aria-expanded:border-border-light',
    'data-[error]:border-border-error',
  ]),
};
