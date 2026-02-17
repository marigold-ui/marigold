import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'group/popover',
  'outline-0',
  'placement-top:mb-1',
  'placement-bottom:mt-1',
  'placement-right:ml-1',
  'placement-left:mr-1',
]);
