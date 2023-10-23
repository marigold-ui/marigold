import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('disabled:text-text-disabled '),
  radio: cva([
    'border-border-light bg-white',
    'group-focus/radio:outline-outline-focus group-focus/radio:outline group-focus/radio:outline-offset-[3px]',
    'group-hover/radio:border-border-hover',
    'group-checked/radio:text-text-light group-checked/radio:bg-bg-selected checked:border-border-selected',
    'group-disabled/radio:bg-bg-disabled group-disabled/radio:border-border-disabled',
  ]),
  label: cva(),
  group: cva('pt-0.5'),
};
