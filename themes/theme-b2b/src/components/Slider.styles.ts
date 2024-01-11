import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva(),
  track: cva([
    'rounded-lg border-none border-transparent',
    'bg-bg-inverted/30 text-transparent',
  ]),
  thumb: cva([
    'align-middle',
    'border-border-inverted rounded-lg border-4 border-solid',
    'h-4 w-4',
    'bg-bg-surface',
    'data-[focused]:border-border-selected',
    'disabled:bg-bg-base-disabled disabled:border-border-base-disabled',
  ]),
  output: cva('text-text-base text-sm'),
};
