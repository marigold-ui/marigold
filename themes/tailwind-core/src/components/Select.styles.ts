import { tv } from 'tailwind-variants';

export const select = tv({
  slots: {
    container: [],
    button: [
      'appearance-none leading-normal px-1 outline-none cursor-pointer',
      'bg-secondary-50',
      'border border-solid border-border-color',
      'mg-disabled:bg-disabled-bg mg-disabled:text-disabled-text mg-disabled:cursor-not-allowed',
      'mg-error:border mg-error:border-text',
    ],
    icon: [],
  },
});
