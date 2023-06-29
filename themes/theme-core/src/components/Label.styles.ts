import { ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = {
  container: cva([
    'leading-6', // align label with input
    'row-span-2 justify-end',
    'group-error/field:text-text-error group-required/field:font-bold',
  ]),
  indicator: cva(),
};
