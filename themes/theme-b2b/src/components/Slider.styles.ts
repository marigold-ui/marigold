import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva(),
  track: cva(['bg-bg-inverted/30 rounded-lg']),
  thumb: cva([
    'align-middle',
    'border-border-inverted rounded-lg border-4 border-solid',
    'size-4',
    'bg-bg-base',
    'rac-focus:border-border-selected',
    'rac-disabled:bg-bg-base-disabled rac-disabled:border-border-base-disabled',
  ]),
  output: cva('text-text-base text-sm'),
};
