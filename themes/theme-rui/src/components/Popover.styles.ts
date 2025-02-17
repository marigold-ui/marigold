import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'z-50 overflow-y-auto overflow-x-hidden rounded-lg outline-0',

  /** animate stuff missing */

  'bg-surface-overlay text-foreground shadow-lg shadow-black/5 ',
  'placement-t:mb-1',
  'placement-b:mt-1',
  'placement-r:ml-1',
  'placement-l:mr-1',
]);
