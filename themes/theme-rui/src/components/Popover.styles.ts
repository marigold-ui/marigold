import { type ThemeComponent, cva } from '@marigold/system';

export const Popover: ThemeComponent<'Popover'> = cva([
  'z-50 overflow-y-auto p-4 overflow-x-hidden rounded-lg',
  'border border-border outline-none',

  /**in progress */
  'aria-expanded:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',

  'bg-surface-overlay text-foreground shadow-lg shadow-black/5 shadow-surface-overlay',
  'placement-t:mb-0.5',
  'placement-b:mt-0.5',
  'placement-r:ml-0.5',
  'placement-l:mr-0.5',
]);
