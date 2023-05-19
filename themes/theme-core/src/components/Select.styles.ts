import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

import { tv, type TVReturnType } from 'tailwind-variants';
export const select: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    container: [],
    button: [
      'appearance-none leading-normal px-1 outline-none cursor-pointer',
      'bg-secondary-50',
      'border border-solid border-border-color',
      'disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed',
      'mg-error:border mg-error:border-error-text',
    ],
    icon: [],
  },
});

export const Select: ThemeComponent<'Select'> = {
  container: cva(),
  button: cva(),
  icon: cva(),
};
