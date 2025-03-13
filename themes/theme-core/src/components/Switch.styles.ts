import { ThemeComponent, cva } from '@marigold/system';

export const Switch: ThemeComponent<'Switch'> = {
  container: cva('justify-start'),
  track: cva([
    'h-component',
    'h-6 w-12 basis-12 rounded-3xl group-disabled/switch:cursor-not-allowed',
    'bg-bg-inverted border-border-inverted border border-solid',
    'group-selected/switch:bg-bg-selected-input group-selected/switch:border-border-selected',
    'group-disabled/switch:group-selected/switch:bg-bg-base-disabled group-disabled/switch:group-selected/switch:border-border-base',
  ]),
  thumb: cva([
    'h-[22px] w-[22px]',
    'cubic-bezier(.7,0,.3,1)',
    'absolute top-px left-0',
    'block translate-x-[1px] rounded-full transition-all duration-100 ease-in-out will-change-transform',
    'group-selected/switch:translate-x-[calc(47px_-_100%)]',
    'size-[22px]',
    'bg-bg-base',
  ]),
};
