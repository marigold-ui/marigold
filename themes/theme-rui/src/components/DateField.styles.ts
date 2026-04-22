import { type ThemeComponent, cva } from '@marigold/system';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva({
    base: [
      'ui-surface shadow-elevation-border h-control',
      'flex items-center',
      'disabled:ui-state-disabled',
      'group-read-only/field:ui-state-readonly',
      'has-focus:ui-state-focus',
      // Need to set error ring manually to override focus ring
      'has-invalid:ui-state-error has-focus:has-invalid:ring-destructive-accent/20',
    ],
  }),
  input: cva({ base: ['ui-input', 'cursor-text'] }),
  segment: cva({
    base: [
      'group/segment inline rounded leading-none whitespace-pre p-0.5 outline-0 caret-transparent',
      'text-foreground',
      'data-placeholder:text-placeholder type-literal:text-placeholder type-literal:px-0',
      'data-focused:bg-focus-highlight-bold data-focused:text-foreground data-focused:data-placeholder:text-foreground',
      'disabled:cursor-not-allowed disabled:text-disabled disabled:bg-disabled-surface',
      'data-placeholder:disabled:text-disabled',
      'invalid:text-destructive-accent invalid:data-focused:bg-destructive-bold invalid:data-focused:text-destructive-bold-foreground invalid:data-focused:data-placeholder:text-destructive-bold-foreground',
    ],
  }),
  action: cva({
    base: 'fill-secondary disabled:text-disabled group-invalid/field:fill-destructive-accent',
  }),
};
