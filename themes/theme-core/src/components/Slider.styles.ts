import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
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
    'disabled:bg-bg-disabled-dark disabled:border-border-disabled',
  ]),
  label: cva('text-text-primary text-base font-normal'),
  output: cva('text-text-primary text-base font-normal'),
};
