import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva([
    '[&>span:first-of-type]:hidden',
    '[&>label:first-of-type]:justify-start',
  ]),
  track: cva(['bg-bg-inverted rounded-lg']),
  selectedTrack: cva(['bg-bg-selectedinput/80 rounded-lg']),
  thumb: cva([
    'align-middle',
    'border-border-base rounded-lg border-4 border-solid',
    'size-4',
    'bg-bg-base',
    'focus:border-border-selected',
    'disabled:bg-bg-inverted-disabled disabled:border-border-base-disabled',
  ]),
  output: cva('text-text-base text-sm'),
};
