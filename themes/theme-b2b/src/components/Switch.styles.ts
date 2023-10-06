import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('flex items-center'),
  track: cva(
    [
      'bg-bg-surface-underlay shadow-shadow-light shadow-[0_0_0_1px]',
      'group-selected/switch:bg-bg-primary ',
      'group-disabled/switch:bg-bg-disabled group-disabled/switch:opacity-[0.5] group-disabled/switch:shadow-[0_0_0_1px]',
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
      'group-disabled/switch:bg-bg-disabled',
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
