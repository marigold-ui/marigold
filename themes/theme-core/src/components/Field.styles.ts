import { ThemeComponent, cva } from '@marigold/system';

export const Field: ThemeComponent<'Field'> = cva(
  'grid grid-cols-[min-content_1fr] grid-rows-[min-content_min-content] gap-x-2 gap-y-0.5'
);
