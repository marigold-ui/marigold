import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('disabled:text-text-base-disabled '),
  radio: cva([
    'border-border-inverted bg-white',
    'group-[focus-visible]/radio:outline-outline-focus group-[focus-visible]/radio:outline group-[focus-visible]/radio:outline-offset-[3px]',
    'group-hover/radio:border-border-base-hover',
    'group-selected/radio:text-text-inverted group-selected/radio:bg-bg-selected group-selected:border-border-selected',
    'group-disabled/radio:bg-bg-inverted-disabled group-disabled/radio:border-border-base-disabled',
  ]),
  label: cva(),
  group: cva('pt-0.5'),
};
