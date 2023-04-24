import { tv } from 'tailwind-variants';

export const checkbox = tv({
  slots: {
    label: 'leading-[1.125] disabled:text-checkbox-label-disabled',
    checkbox: [
      'rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5',
      'hover:border-checkbox-base-hover',
      'focus:outline-2 focus:outline focus:outline-checkbox-base-focus focus:outline-offset[3]',
      'checked:text-white checked:border-checkbox-base-checked checked:bg-checkbox-base-checkedBackground',
      'indeterminate:text-white indeterminate:border-checkbox-base-indeterminate indeterminate:bg-checkbox-base-indeterminateBackground',
      'disabled:border-checkbox-base-disabled disabled:bg-checkbox-base-disabledBackground',
    ],
  },
  variants: {
    size: {
      small: {
        container: 'py-1',
      },
    },
  },
});
