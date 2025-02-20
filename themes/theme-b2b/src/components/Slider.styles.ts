import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva('*:aria-hidden:hidden'),
  track: cva(['bg-bg-inverted/30 rounded-lg']),
  selectedTrack: cva(['bg-bg-selected-input rounded-lg']),
  thumb: cva([
    'align-middle',
    'border-border-inverted rounded-lg border-4 border-solid',
    'size-4',
    'bg-bg-base',
    'focus:border-border-selected',
    'disabled:bg-bg-base-disabled disabled:border-border-base-disabled',
  ]),
  output: cva('text-text-base text-sm'),
};
