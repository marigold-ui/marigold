import { tv, type TVReturnType } from 'tailwind-variants';
export const select: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    container: [],
    button: [
      'cursor-pointer appearance-none px-1 leading-normal outline-none',
      'bg-secondary-50',
      'border-border-color border border-solid',
      'disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed',
      'mg-error:border mg-error:border-error-text',
    ],
    icon: [],
  },
});
