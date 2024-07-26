import { ThemeComponent, cva } from '@marigold/system';

export const Field: ThemeComponent<'Field'> = cva(
  'grid grid-rows-[repeat(3,minmax(0,min-content))] gap-y-0.5'
);
