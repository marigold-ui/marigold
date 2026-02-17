import { type ThemeComponent, cva } from '@marigold/system';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'ui-surface shadow-elevation-border h-input',
    'flex items-center',
    'disabled:ui-state-disabled',
    'group-read-only/field:ui-state-readonly',
    'has-focus:ui-state-focus',
    // Need to set error ring manually to override focus ring
    'has-invalid:ui-state-error has-focus:has-invalid:ring-destructive/20',
  ]),
  input: cva(['ui-input', 'cursor-text']),
  segment: cva([
    'inline rounded p-0.5 text-foreground caret-transparent outline-0 type-literal:px-0 data-focused:data-placeholder:text-foreground data-focused:text-foreground  type-literal:text-placeholder',
    'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
    'data-focused:bg-focus',
    'data-placeholder:disabled:text-disabled-foreground',
    'invalid:data-focused:bg-destructive invalid:data-focused:data-placeholder:text-destructive-foreground invalid:data-focused:text-destructive-foreground invalid:placeholder:text-destructive invalid:text-destructive data-placeholder:text-placeholder',
    'group/segment',
    'outline-0',
    'whitespace-pre',
    'data-placeholder:text-placeholder text-foreground data-focused:bg-focus data-focused:text-foreground rounded leading-none',
  ]),
  action: cva(
    'fill-muted-foreground disabled:text-disabled-foreground group-invalid/field:fill-destructive'
  ),
};
