import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DateField: ThemeComponent<'DateField'> = {
  segment: cva([
    'text-datefield-segmentText focus-visible:bg-datefield-segment focus-visible:text-secondary-50',
  ]),
  field: cva([
    'border border-solid border-border-color bg-secondary-50',
    'group-disabled/field:cursor-not-allowed group-disabled/field:bg-disabled-bg group-disabled/field:text-disabled-text',
  ]),
  action: cva('pr-2 '),
};
