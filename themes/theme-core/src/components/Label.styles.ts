import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Label: ThemeComponent<'Label'> = cva([
  'row-span-2 justify-end group-error/field:bg-red-500',
]);
