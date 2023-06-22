import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva(),
  stepper: cva(),
};
