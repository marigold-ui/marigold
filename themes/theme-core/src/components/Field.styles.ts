import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Field: ThemeComponent<'Field'> = cva(
  'grid grid-cols-[min-content_1fr] grid-rows-[min-content_min-content] gap-x-2 gap-y-0.5 items-baseline'
);
