import { tv } from 'tailwind-variants';

export const helpText = tv({
  slots: {
    container: [`data-[error]:text-error-text`],
    icon: ['16'],
  },
});
