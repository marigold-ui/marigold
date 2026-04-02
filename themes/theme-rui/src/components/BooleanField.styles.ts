import { type ThemeComponent, cva } from '@marigold/system';

export const BooleanField: ThemeComponent<'BooleanField'> = {
  container: cva({ base: 'grid grid-cols-[auto_1fr] gap-x-2' }),
  description: cva({ base: 'col-start-2 mt-0.5' }),
};
