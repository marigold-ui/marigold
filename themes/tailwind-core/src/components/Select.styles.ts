import { tv } from 'tailwind-variants';

export const select = tv({
  slots: {
    container: [],
    button: [
      'appearance-none leading-normal px-1 outline-none cursor-pointer',
      'bg-secondary-50',
      'border border-solid border-border-color',
      'disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed',
      'data-[error]:border data-[error]:border-error-text',
    ],
    icon: [],
  },
});
