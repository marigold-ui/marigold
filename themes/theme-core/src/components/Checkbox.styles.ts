import { ThemeComponent, cva } from '@marigold/system';

// TODO: use group or something to show outline around checkbox (svg)

export const Checkbox: ThemeComponent<'Checkbox'> = {
  container: cva('', {
    variants: {
      size: {
        small: 'py-1',
      },
    },
  }),
  label: cva([
    'group-[disabled]/checkbox:text-text-base-disabled leading-none',
  ]),
  checkbox: cva([
    'border-border-inverted rounded-[2px] bg-white p-0.5',
    'group-hovered/checkbox:border-border-base-hover',
    'group-[focus-visible]/checkbox:outline-outline-focus group-[focus-visible]/checkbox:outline group-[focus-visible]/checkbox:outline-offset-2',
    'group-selected/checkbox:border-border-selected group-selected/checkbox:bg-bg-selected group-selected/checkbox:text-white fill-white',
    'group-disabled/checkbox:group-selected/checkbox:border-border-base-disabled group-disabled/checkbox:border-border-base-disabled group-disabled/checkbox:group-selected/checkbox:bg-bg-base-disabled',
    'group-indeterminate/checkbox:border-border-selected group-indeterminate/checkbox:bg-bg-selected group-indeterminate/checkbox:text-text-inverted',
  ]),
  group: cva('pt-1'),
};
