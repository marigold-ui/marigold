import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'border rounded-sm border-input-border bg-white',
  'p-0.5',
  'focus:outline-focus-bg focus:outline-2 focus:outline -outline-offset-1',
  'disabled:bg-disabled-bg',
]);
