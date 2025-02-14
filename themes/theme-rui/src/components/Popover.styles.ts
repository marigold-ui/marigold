import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'z-50 overflow-y-auto p-4 overflow-x-hidden rounded-lg',
  'border border-border outline-none',

  /** animate stuff missing */

  'bg-surface-overlay text-foreground shadow-lg shadow-black/5 ',
  'placement-t:mb-0.5',
  'placement-b:mt-0.5',
  'placement-r:ml-0.5',
  'placement-l:mr-0.5',
]);
