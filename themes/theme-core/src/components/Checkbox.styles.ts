import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva([], {
    variants: {
      size: {
        small: 'py-1',
      },
    },
  }),
  label: cva('group-data-[disabled]/checkbox:text-text-disabled leading-none'),
  checkbox: cva([
    'border-border-light rounded-[2] bg-white p-0.5',
    'group-data-[hovered]/checkbox:border-border-hover',
    'group-[selected]/checkbox:border-border-selected group-data-[selected]/checkbox:bg-bg-selected fill-white group-data-[selected]/checkbox:text-white',
    'group-[disabled]/checkbox:group-[selected]/checkbox:border-border-disabled group-[disabled]/checkbox:group-[selected]/checkbox:bg-bg-disabled-dark',
    'group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected group-indeterminate/checkbox:text-text-light',
  ]),
};
