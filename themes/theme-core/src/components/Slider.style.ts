import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Slider: ThemeComponent<'Slider'> = {
  track: cva([
    'absolute top-4 h-2 w-full',
    'rounded-lg border-none border-transparent',
    'bg-slider-track-background text-transparent',
  ]),
  thumb: cva([
    'align-middle',
    'border-slider-thumb-border rounded-lg border-4 border-solid',
    'h-4 w-4',
    'bg-slider-thumb-background',
    'mg-focus:border-slider-thumb-focus',
    'mg-disabled:bg-slider-thumb-disabled-background mg-disabled:border-slider-thumb-disabled-border',
  ]),
  label: cva('text-slider-label-text text-base font-normal'),
  output: cva('text-slider-ouput-text text-base font-normal'),
};
