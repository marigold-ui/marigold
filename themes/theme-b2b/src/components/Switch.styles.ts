import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('justify-between'),
  track: cva(
    [
      'h-6 w-12 basis-12 rounded-3xl group-disabled/switch:cursor-not-allowed',
      'bg-bg-inverted/20 border-border-base border',
      'group-disabled/switch:group-selected/switch:bg-bg-base-disabled',
      'group-selected/switch:bg-bg-selected-input',
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
      'h-[22px] w-[22px]',
      'cubic-bezier(.7,0,.3,1)',
      'absolute top-px left-0',
      'block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform',
      'group-selected/switch:translate-x-[calc(47px_-_100%)]',
      'bg-bg-base',
      'group-disabled/switch:bg-bg-base-disabled',
      'border-border-base border border-solid',
    ],
    {
      variants: {
        size: {
          large:
            'group-selected/switch:translate-x-[calc(95px_-_44px)] top-0.5 size-11',
        },
      },
    }
  ),
};
