import { tv, type TVReturnType } from 'tailwind-variants';
export const checkbox: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    label: 'data-[disabled]:text-checkbox-label-disabled leading-[1.125]',
    checkbox: [
      'border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5',
      'data-[hover]:border-checkbox-base-hover',
      'data-[focus]:outline-checkbox-base-focus data-[focus]:outline-offset[3] data-[focus]:outline data-[focus]:outline-2',
      'data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground data-[checked]:text-white',
      'data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground data-[indeterminate]:text-white',
      'data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
    ],
    container: '',
  },
  variants: {
    size: {
      small: {
        container: 'py-1',
      },
    },
  },
});
