import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Field: ThemeComponent<'Field'> = cva(
  'grid grid-cols-[min-content_1fr] grid-rows-2 gap-2'
);
