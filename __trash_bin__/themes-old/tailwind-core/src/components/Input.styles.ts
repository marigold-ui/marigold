import { tv, type TVReturnType } from 'tailwind-variants';
export const input: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    input: [
      'border-input-border rounded-sm border border-solid',
      'px-2 leading-normal',
      'data-[has-icon]:pl-8',
      'mg-error:border-error-text',
    ],
    icon: ['left-1'],
    container: [''],
  },
});
