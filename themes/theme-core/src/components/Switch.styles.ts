import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva([
    'h-[22px]',
    'bg-bg-surface-raised shadow-[0_0_0_1px]',
    'group-selected/switch:bg-bg-primary group-selected/switch:shadow-[#ae440a]',
    'group-disabled/switch:bg-bg-disabled group-disabled/switch:opacity-[0.5] group-disabled/switch:shadow-[0_0_0_1px] ',
  ]),
  thumb: cva([
    'h-[20px] w-[20px]',
    'bg-white',
    'group-disabled/switch:bg-bg-disabled',
    'shadow-[1px_1px_4px]',
  ]),
};
