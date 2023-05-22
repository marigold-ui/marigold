import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(),
  track: cva(
    [
      'border-input-border border bg-white shadow-[inset_0px_0px_1px',
      'checked:bg-switch-track-primary checked:shadow-switch-track-checked',
      'disabled:opacity-[0.5] disabled:shadow-switch-track-shadow disabled:bg-switch-track-shadow focus:outline-none focus:outline-offset[3]',
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
    ['bg-root-body', 'h-5 w-5'],

    // 'shadow-[inset_1px_1px_4px] shadow-switch-thumb-shadow disabled:bg-switch-thumb-disabled',
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
