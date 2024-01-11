import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva(''),
  track: cva(
    [
      'bg-bg-inverted/20 border border-border-base',
      'group-selected/switch:bg-bg-selected-input',
      'group-disabled/switch:bg-bg-base-disabled group-disabled/switch:opacity-[0.5] group-disabled/switch:shadow-[0_0_0_1px]',
    ],
    {
      variants: {
        size: {
          large: 'h-12 min-w-[96px] rounded-[40px]',
        },
      },
    }
  ),
  thumb: cva(
    [
      'bg-white',
      'group-disabled/switch:bg-bg-base-disabled',
      'shadow-[1px_1px_4px]',
    ],
    {
      variants: {
        size: {
          large:
            'group-selected/switch:translate-x-[calc(95px_-_44px)] top-0.5 h-11 w-11',
        },
      },
    }
  ),
};
