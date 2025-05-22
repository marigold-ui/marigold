import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const inputContainer =
  'flex w-full px-3 py-2 rounded-lg shadow-sm shadow-black/5 border border-input bg-background text-sm text-foreground transition-shadow group-read-only/field:bg-muted';
export const inputDisabled =
  'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled';
export const inputInvalid =
  'group-invalid/field:border-destructive group-invalid/field:focus:border-destructive group-invalid/field:focus:ring-destructive/20';

export const inputReadOnly = 'group-read-only/field:bg-muted';

export const Input: ThemeComponent<'Input'> = {
  input: cva([
    inputContainer,
    inputDisabled,
    inputInvalid,
    'focus:util-focus-ring outline-none',
    inputReadOnly,
    'h-input',
    'placeholder:text-placeholder',
    '[&[type=file]]:cursor-pointer [&[type=file]]:border-solid [&[type=file]]:bg-background [&[type=file]]:p-0 [&[type=file]]:pr-3 [&[type=file]]:italic [&[type=file]]:text-muted-foreground/70',
    'file:cursor-pointer file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',
    'group-[[data-icon]]/input:pl-8',
    'group-[[data-action]]/input:pr-7',
    'data-[focus-within]:util-focus-ring outline-0',
  ]),
  icon: cva([
    'pointer-events-none left-1',
    'text-muted-foreground disabled:text-disabled-foreground',
  ]),
  action: cva(['text-muted-foreground right-1']),
  segment: cva([
    'group/segment',
    'outline-0',
    'whitespace-pre',
    'data-[placeholder]:text-placeholder text-foreground data-[focused]:bg-focus data-[focused]:text-foreground rounded',
  ]),
};
