import { type ThemeComponent, cva } from '@marigold/system';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva({
    base: [
      'ui-surface shadow-elevation-border h-input',
      'flex items-center',
      'disabled:ui-state-disabled',
      'group-read-only/field:ui-state-readonly',
      'has-focus:ui-state-focus',
      // Need to set error ring manually to override focus ring
      'has-invalid:ui-state-error has-focus:has-invalid:ring-destructive/20',
    ],
  }),
  input: cva({ base: ['ui-input', 'cursor-text'] }),
  segment: cva({
    base: [
      'group/segment inline rounded leading-none whitespace-pre p-0.5 outline-0 caret-transparent',
      'text-foreground',
      'data-placeholder:text-placeholder type-literal:text-placeholder type-literal:px-0',
      'data-focused:bg-stone-300 data-focused:text-foreground data-focused:data-placeholder:text-foreground',
      'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
      'data-placeholder:disabled:text-disabled-foreground',
      'invalid:text-destructive invalid:data-focused:bg-destructive invalid:data-focused:text-destructive-foreground invalid:data-focused:data-placeholder:text-destructive-foreground',
    ],
  }),
  action: cva({
    base: 'fill-secondary disabled:text-disabled-foreground group-invalid/field:fill-destructive',
  }),
};
