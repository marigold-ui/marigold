import { tv } from 'tailwind-variants';

export const helpText = tv({
  slots: {
    container: [
      'text-[13px] text-helptext-container-textColor',
      'data-[invalid]:text-[13px] data-[invalid]:text-error',
    ],
    icon: ['16'],
  },
});
