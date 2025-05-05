import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva('group-disabled/radio:cursor-not-allowed'),
  label: cva([
    'text-sm font-normal cursor-pointer',
    'group-disabled/radio:text-disabled-foreground group-disabled/radio:cursor-not-allowed',
  ]),
  radio: cva([
    'aspect-square size-4 rounded-full',
    'border border-input shadow-sm shadow-black/5',
    'group-focus-visible/radio:util-focus-ring outline-none',
    'group-disabled/radio:border-disabled',
    'group-selected/radio:border-brand group-selected/radio:bg-brand group-selected/radio:text-brand-foreground',
  ]),
  group: cva(),
};
