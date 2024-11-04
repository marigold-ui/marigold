import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva(),
  track: cva(['bg-bg-inverted rounded-lg']),
  rangeTrack: cva(['bg-bg-selected-input/80 rounded-lg']),
  thumb: cva([
    'align-middle',
    'border-border-base rounded-lg border-4 border-solid',
    'size-4',
    'bg-bg-base',
    'rac-focus:border-border-selected',
    'rac-disabled:bg-bg-inverted-disabled rac-disabled:border-border-base-disabled',
  ]),
  output: cva('text-text-base text-sm'),
};
