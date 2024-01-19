import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('justify-between'),
  track: cva(
    [
      'bg-bg-inverted/20 border-border-base border',
      'group-selected/switch:bg-bg-selected-input',
      'group-disabled/switch:bg-bg-base-disabled group-disabled/switch:opacity-[0.5]',
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
