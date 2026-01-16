import { type ThemeComponent, cva } from '@marigold/system';

export const DateField: ThemeComponent<'DateField'> = {
  field: cva([
    'surface shadow-elevation-base h-input',
    'flex items-center',
    'disabled:state-disabled',
    'group-read-only/field:state-readonly',
    'has-invalid:surface-has-error',
    'has-focus:state-focus outline-none',
  ]),
  input: cva([
    'w-full min-w-0 px-3 py-2 bg-transparent outline-none text-foreground placeholder:text-placeholder text-sm rounded-[inherit] h-input',
  ]),
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
