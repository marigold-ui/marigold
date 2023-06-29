import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    [
      'bg-bg-surface-raised shadow-[0_0_0_1px]',
      'group-selected/switch:bg-bg-primary group-selected/switch:shadow-[#ae440a]',
      'group-disabled/switch:bg-bg-disabled group-disabled/switch:opacity-[0.5] group-disabled/switch:shadow-[0_0_0_1px] ',
    ],
    {
      variants: {
        size: {
          large: 'h-[48] w-[96] rounded-[40]',
        },
      },
    }
  ),
  thumb: cva(
    [
      'bg-white',
      'group-disabled/switch:bg-bg-disabled',
      'shadow-[1px_1px_4px]',
    ],
    {
      variants: {
        size: {
          large: 'top-2 h-[44] w-[44]',
        },
      },
    }
  ),
};
