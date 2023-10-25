import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva(),
  track: cva([
    'rounded-lg border-none border-transparent',
    'bg-bg-neutral text-transparent',
  ]),
  thumb: cva([
    'align-middle',
    'border-border-dark rounded-lg border-4 border-solid',
    'h-4 w-4',
    'bg-bg-surface',
    'data-[focused]:border-border-focus',
    'disabled:bg-bg-disabled disabled:border-border-disabled',
  ]),
  output: cva('text-text-body text-sm'),
};
