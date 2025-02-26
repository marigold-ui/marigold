import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva([
    'border-border-base group-[hovered]/checkbox:border-border-base-hover rounded-sm',
    'group-[focus-visible]/checkbox:outline-outline-focus group-[focus-visible]/checkbox:outline-2 group-[focus-visible]/checkbox:outline-offset-2',
    'group-selected/checkbox:border-border-input group-selected/checkbox:bg-bg-selected-input group-indeterminate/checkbox:border-border-selected-input group-indeterminate/checkbox:bg-bg-selected-input group-indeterminate/checkbox:text-text-inverted group-data-selected/checkbox:text-text-inverted',
    'group-disabled/checkbox:group-selected/checkbox:border-border-base-disabled group-disabled/checkbox:group-selected/checkbox:bg-bg-base-disabled ',
  ]),
  container: cva(''),
  label: cva('group-disabled/checkbox:text-text-base-disabled'),
  group: cva(''),
};
