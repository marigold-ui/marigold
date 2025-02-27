import { ThemeComponent, cva } from '@marigold/system';

export const Radio: ThemeComponent<'Radio'> = {
  container: cva(),
  label: cva('group-disabled/radio:opacity-70 text-sm'),
  radio: cva([
    'aspect-square size-4 rounded-full',
    'border border-input shadow-sm shadow-black/5',
    'outline-offset-2 group-[focus-visible]/radio:outline-2 group-[focus-visible]/radio:outline-ring/70',
    'group-disabled/radio:opacity-50',
    'group-selected/radio:border-brand group-selected/radio:bg-brand group-selected/radio:text-brand-foreground',
  ]),
  group: cva(),
};
