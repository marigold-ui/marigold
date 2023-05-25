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
    'leading-[1.125] group-disabled/checkbox:text-checkbox-label-disabled'
  ),
  checkbox: cva([
    'rounded-[2] border-checkbox-base-border bg-checkbox-base-background p-0.5',
    'group-hover/checkbox:border-checkbox-base-hover',
    'group-checked/checkbox:text-white group-checked/checkbox:border-checkbox-base-checked group-checked/checkbox:bg-checkbox-base-checkedBackground',
    'group-disabled/checkbox:border-checkbox-base-disabled group-disabled/checkbox:bg-checkbox-base-disabled',
    'group-indeterminate/checkbox:text-white group-indeterminate/checkbox:border-checkbox-base-indeterminate group-indeterminate/checkbox:bg-checkbox-base-indeterminateBackground',
  ]),
};
