import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva([], {
    variants: {
      size: {
        small: 'py-1',
      },
    },
  }),
  label: cva(
    'group-data-[disabled]/checkbox:text-text-base-disabled leading-none'
  ),
  checkbox: cva([
    'border-border-inverted rounded-[2] bg-white p-0.5',
    'group-data-[hovered]/checkbox:border-border-base-hover',
    'group-[selected]/checkbox:border-border-selected group-data-[selected]/checkbox:bg-bg-selected fill-white group-data-[selected]/checkbox:text-white',
    'group-[disabled]/checkbox:group-[selected]/checkbox:border-border-base-disabled group-[disabled]/checkbox:group-[selected]/checkbox:bg-bg-inverted-disabled-dark',
    'group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected group-indeterminate/checkbox:text-text-inverted',
  ]),
  group: cva('pt-1'),
};
