import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const DateField: ThemeComponent<'DateField'> = {
  segment: cva([
    'text-datefield-segmentText focus-visible:bg-datefield-segment focus-visible:text-secondary-50 ',
  ]),

  field: cva([
    'border-border-color bg-secondary-50 border border-solid',
    ' group-disabled/field:bg-disabled-bg group-disabled/field:text-disabled-text',
  ]),
  action: cva('pr-2 '),
};
