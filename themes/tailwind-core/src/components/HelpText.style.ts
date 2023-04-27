import { tv } from 'tailwind-variants';

export const helpText = tv({
  slots: {
    container: [
      `data-[error]:text-error [&:error]:text-error`,
      'text-helptext-container-textColor',
    ],
    icon: ['16'],
  },
});
