import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    [
      'bg-switch-track-background shadow-[0_0_0_1px] shadow-switch-track-shadow',
      'group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked',
      'group-disabled/switch:opacity-[0.5] group-disabled/switch:bg-switch-track-disabled group-disabled/switch:shadow-[0_0_0_1px] group-disabled/switch:shadow-switch-track-shadow',
    ],
    {
      variants: {
        size: {
          large: 'w-[96] h-[48] rounded-[40]',
        },
      },
    }
  ),
  thumb: cva(
    [
      'bg-secondary-50',
      'group-disabled/switch:bg-switch-thumb-disabled',
      'shadow-[1px_1px_4px]',
    ],
    {
      variants: {
        size: {
          large: 'top-2 w-[44] h-[44]',
        },
      },
    }
  ),
  label: cva(''),
};
