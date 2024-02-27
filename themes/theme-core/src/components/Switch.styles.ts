import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('justify-start'),
  track: cva([
    'h-[22px]',
    'bg-bg-inverted border-border-inverted border border-solid',
    'group-selected/switch:bg-bg-selected-input group-selected/switch:border-border-selected',
    'group-disabled/switch:bg-bg-base-disabled group-disabled/switch:border-border-base',
  ]),
  thumb: cva([
    'size-[20px]',
    'bg-bg-base',
    'group-selected/switch:border-border-selected',
    'group-disabled/switch:bg-bg-base-disabled group-disabled/switch:border-border-base',
  ]),
};
