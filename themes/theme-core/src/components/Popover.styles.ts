import { ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'bg-bg-surface-overlay',
  'placement-t:mb-0.5',
  'placement-b:mt-0.5',
  'placement-r:ml-0.5',
  'placement-l:mr-0.5',
]);
