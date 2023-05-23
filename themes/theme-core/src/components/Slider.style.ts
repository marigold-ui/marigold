import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Slider: ThemeComponent<'Slider'> = {
  track: cva([
    'absolute w-full top-4 h-2',
    'border-none border-transparent rounded-lg',
    'text-transparent bg-slider-track-background',
  ]),
  thumb: cva([
    'align-middle',
    'border-4 border-solid rounded-lg border-slider-thumb-border',
    'w-4 h-4',
    'bg-slider-thumb-background',
    // there is duplication here
    'focus:border-4 focus:border-solid focus:border-slider-thumb-focus',
    'disabled:border-4 disabled:border-solid border-slider-thumb-disabled-border disabled: bg-slider-thumb-disabled-background',
  ]),
  label: cva('text-slider-label-text text-base font-normal'),
  output: cva('text-slider-ouput-text text-base font-normal'),
};
