import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'group/popover',
  'z-50 overflow-y-auto overflow-x-hidden rounded-md outline-0 border-input',
  /** animate stuff missing */
  'bg-surface-overlay text-foreground shadow-md',
  'placement-top:mb-1',
  'placement-bottom:mt-1',
  'placement-right:ml-1',
  'placement-left:mr-1',
]);
