import { tv, type TVReturnType } from 'tailwind-variants';
export const input: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    input: [
      'border border-solid rounded-sm border-input-border',
      'leading-normal pl-2 pr-2',
      'data-[has-icon]:pl-8',
      'mg-error:border-error-text',
    ],
    icon: ['left-1'],
    container: [''],
  },
});
