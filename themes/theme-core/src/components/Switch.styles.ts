import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    'bg-switch-track-bg shadow-[inset_0px_0px_1px] shadow-switch-track-shadow checked:bg-switch-track-primary checked:shadow-switch-track-checked disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-offset[3] focus:outline-switch-track-outline-focus',
    {
      variants: {
        size: {
          large: 'w-[96] h-[48] rounded-[40]',
        },
      },
    }
  ),
  thumb: cva(
    'shadow-[inset_1px_1px_4px] shadow-switch-thumb-shadow disabled:bg-switch-thumb-disabled',
    {
      variants: {
        size: {
          large: 'top-2 w-[44] h-[44] checked:translate-x-[calc(95px - 44px)]',
        },
      },
    }
  ),
  label: cva(''),
};
