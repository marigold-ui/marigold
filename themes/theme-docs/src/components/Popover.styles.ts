import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'animate-in',
  'placement-t:-translate-y-1',
  'placement-b:translate-y-1',
  'placement-r:-translate-x-1',
  'placement-l:translate-x-1',
]);
