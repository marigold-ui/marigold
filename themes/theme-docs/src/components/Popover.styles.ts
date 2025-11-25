import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'animate-in',
  'placement-top:-translate-y-1',
  'placement-bottom:translate-y-1',
  'placement-right:-translate-x-1',
  'placement-left:translate-x-1',
]);
