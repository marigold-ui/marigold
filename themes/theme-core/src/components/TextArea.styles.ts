import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'border-input-border rounded-sm border bg-white',
  'p-0.5',
  'focus:outline-focus-bg -outline-offset-1 focus:outline focus:outline-2',
  'disabled:bg-disabled-bg',
]);
