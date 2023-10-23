import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('disabled:text-text-disabled '),
  radio: cva([
    'border-border-light bg-white',
    'group-[focus-visible]/radio:outline-outline-focus group-[focus-visible]/radio:outline group-[focus-visible]/radio:outline-offset-[3px]',
    'group-hover/radio:border-border-hover',
    'group-selected/radio:text-text-light group-selected/radio:bg-bg-selected group-selected:border-border-selected',
    'group-disabled/radio:bg-bg-disabled group-disabled/radio:border-border-disabled',
  ]),
  label: cva(),
  group: cva('pt-0.5'),
};
