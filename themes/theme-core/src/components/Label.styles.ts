import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Label: ThemeComponent<'Label'> = {
  container: cva([
    'leading-6', // align label with input
    'row-span-2 justify-end',
    'group-error/field:text-error-text group-required/field:font-bold',
  ]),
  indicator: cva(),
};
