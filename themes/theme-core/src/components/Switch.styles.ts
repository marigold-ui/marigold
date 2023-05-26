import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    [
      'bg-switch-track-background shadow-[0_0_0_1px] shadow-switch-track-shadow',
      'group-selected/switch:bg-switch-track-primary group-selected/switch:shadow-switch-track-checked',
      'mg-disabled:opacity-[0.5] disabled:bg-dis',
      'focus:outline-none focus:outline-offset[3]',
      'focus:outline-switch-track-outline-focus',
    ],
    {
      variants: {
        size: {
          large: 'w-[96] h-[48] rounded-[40]',
        },
      },
    }
  ),
  thumb: cva(['bg-switch-track-background', 'shadow-[1px_1px_4px]'], {
    variants: {
      size: {
        large: 'top-2 w-[44] h-[44] ',
      },
    },
  }),
  label: cva(''),
};
