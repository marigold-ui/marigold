import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    [
      'bg-white shadow-[inset_0_0_0_1px] shadow-switch-track-shadow',
      'mg-selected:bg-switch-track-primary mg-selected:shadow-switch-track-checked',
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
  thumb: cva(
    ['bg-root-body', 'shadow-[inset_1_1px_4px] shadow-switch-thumb-shadow'],
    {
      variants: {
        size: {
          large: 'top-2 w-[44] h-[44] checked:translate-x-[calc(95px_-_44px)]',
        },
      },
    }
  ),
  label: cva(''),
};
