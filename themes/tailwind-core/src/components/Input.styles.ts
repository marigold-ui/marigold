import { tv } from 'tailwind-variants';

export const input = tv({
  slots: {
    input: [
      'border border-solid rounded-sm border-input-border',
      'leading-normal pl-7 pr-2',
      'data-has-icon:pl-8',
    ],
    icon: ['left-1'],
    container: [''],
  },
});
