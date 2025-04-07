import { ThemeComponent, cva } from '@marigold/system';
import { Input } from './Input.styles';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva('h-component'),
  stepper: cva('rac-disabled:bg-none rac-disabled:text-text-base-disabled'),
  input: Input.input,
};
