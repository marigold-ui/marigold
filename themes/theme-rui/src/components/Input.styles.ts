import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const inputContainer =
  'flex w-full px-3 py-2 rounded-lg shadow-sm shadow-black/5 border border-input-border bg-background text-sm text-foreground transition-shadow';
export const inputDisabled = 'disabled:cursor-not-allowed disabled:opacity-50';
export const inputInvalid =
  'group-error/field:border-destructive group-error/field:focus:border-destructive group-error/field:focus:ring-destructive/20';
export const inputFocus =
  'focus:border-input-ring focus:outline-none focus:ring-[3px] focus:ring-input-ring/20';
export const inputReadOnly = 'read-only:bg-muted';

export const Input: ThemeComponent<'Input'> = {
  input: cva([
    inputContainer,
    inputDisabled,
    inputInvalid,
    inputFocus,
    inputReadOnly,
    'h-input',
    'placeholder:text-placeholder',
    '[&[type=file]]:border-solid [&[type=file]]:bg-background [&[type=file]]:p-0 [&[type=file]]:pr-3 [&[type=file]]:italic [&[type=file]]:text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input-border file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',
    'group-[icon]/input:pl-8',
    'group-[action]/input:pr-8',
  ]),
  icon: cva([
    'pointer-events-none left-1',
    'text-muted-foreground disabled:opacity-50',
  ]),
  action: cva(['text-muted-foreground right-1']),
};
