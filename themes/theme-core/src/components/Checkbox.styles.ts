import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva([], {
    variants: {
      size: {
        small: 'py-1',
      },
    },
  }),
  label: cva('group-disabled/checkbox:text-text-disabled leading-none'),
  checkbox: cva([
    'border-border-light rounded-[2] bg-white p-0.5',
    'group-hover/checkbox:border-border-hover',
    'group-checked/checkbox:border-border-selected group-checked/checkbox:bg-bg-selected group-checked/checkbox:text-text-light',
    'group-disabled/checkbox:border-border-disabled group-disabled/checkbox:bg-bg-disabled',
    'group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected group-indeterminate/checkbox:text-text-light',
  ]),
};
