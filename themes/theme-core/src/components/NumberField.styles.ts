import { ThemeComponent, cva } from '@marigold/system';

export const NumberField: ThemeComponent<'NumberField'> = {
  group: cva(),
  stepper: cva('rac-disabled:bg-none rac-disabled:text-text-base-disabled'),
  input: cva(),
};
