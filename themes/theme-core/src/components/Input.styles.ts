import { cva } from 'class-variance-authority';

export const Input = {
  input: cva(
    [
      'border border-solid rounded-sm border-input-border',
      'leading-normal pl-2 pr-2',
      'data-[has-icon]:pl-8',
      'mg-error:border-error-text',
    ],
    {}
  ),
  icon: cva('left-1', {}),
  container: cva({}),
};
