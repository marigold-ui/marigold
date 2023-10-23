import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva(),
  label: cva('disabled:text-text-disabled text-sm'),
  radio: cva([
    'border-border-light',
    'group-hover/radio:border-border-hover',
    'group-selected/radio:border-border-selected-input group-selected/radio:bg-bg-selected-input group-selected/radio:text-white',
    'group-[focus-visible]/radio:outline-outline-focus group-[focus-visible]/radio:outline group-[focus-visible]/radio:outline-2 group-[focus-visible]/radio:outline-offset-2',
    'group-disabled/radio:bg-bg-disabled group-disabled/radio:border-border-disabled',
  ]),
  group: cva(),
};
