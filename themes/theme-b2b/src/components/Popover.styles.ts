import { ThemeComponent, cva } from '@marigold/system';
import { ELEVALTION_RING } from '../mixins';

export const Popover: ThemeComponent<'Popover'> = cva([
  'bg-bg-surface-overlay shadow-surface-overlay',
  'placement-t:mb-0.5',
  'placement-b:mt-0.5',
  'placement-r:ml-0.5',
  'placement-l:mr-0.5',
  ELEVALTION_RING,
]);
