import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva([], {
    variants: {
      size: {
        small: 'underline',
      },
    },
  }),
  label: cva('leading-[1.125] data-[disabled]:text-checkbox-label-disabled'),
  checkbox: cva([
    'rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5',
    'data-[hover]:border-checkbox-base-hover',
    'data-[focus]:outline-2 data-[focus]:outline data-[focus]:outline-checkbox-base-focus data-[focus]:outline-offset[3]',
    'data-[checked]:text-white data-[checked]:border-checkbox-base-checked data-[checked]:bg-checkbox-base-checkedBackground',
    'data-[indeterminate]:text-white data-[indeterminate]:border-checkbox-base-indeterminate data-[indeterminate]:bg-checkbox-base-indeterminateBackground',
    'data-[disabled]:border-checkbox-base-disabled data-[disabled]:bg-checkbox-base-disabledBackground',
  ]),
};
