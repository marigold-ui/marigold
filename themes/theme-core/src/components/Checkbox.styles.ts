import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva([], {
    variants: {
      size: {
        small: 'py-1',
      },
    },
  }),
  label: cva(
    'group-disabled/checkbox:text-checkbox-label-disabled leading-[1.125]'
  ),
  checkbox: cva([
    'border-checkbox-base-border bg-checkbox-base-background rounded-[2] p-0.5',
    'group-hover/checkbox:border-checkbox-base-hover',
    'group-checked/checkbox:border-checkbox-base-checked group-checked/checkbox:bg-checkbox-base-checkedBackground group-checked/checkbox:text-white',
    'group-disabled/checkbox:border-checkbox-base-disabled group-disabled/checkbox:bg-checkbox-base-disabled',
    'group-indeterminate/checkbox:border-checkbox-base-indeterminate group-indeterminate/checkbox:bg-checkbox-base-indeterminateBackground group-indeterminate/checkbox:text-white',
  ]),
};
