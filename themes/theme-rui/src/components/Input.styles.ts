import { cn, cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const inputContainer =
  'flex w-full px-3 py-2 rounded-lg shadow-xs border border-input bg-background text-sm text-foreground transition-shadow group-read-only/field:bg-muted';
export const inputDisabled =
  'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled';
export const inputInvalid =
  'group-invalid/field:border-destructive group-invalid/field:focus:border-destructive group-invalid/field:focus:ring-destructive/20';

export const inputReadOnly = 'group-read-only/field:bg-muted';

/** ============= NEW ============== */
const newDisabled = cva(
  'has-disabled:cursor-not-allowed has-disabled:text-disabled-foreground has-disabled:bg-disabled'
);

const newFocus = cva(
  'ring-ring/25 has-focus-visible:border-ring has-focus-visible:ring-[3px]'
);

const newInputContainer = cva([
  'relative inline-flex w-full h-input',
  // 'bg-background bg-clip-padding',
  'text-foreground text-sm',
  'border-input rounded-lg border',
  // 'shadow-xs transition-shadow has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none',

  // 'has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/10%)]',
]);

const newInput = cva(
  'w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] outline-none'
);

/** ================================ */

export const Input: ThemeComponent<'Input'> = {
  container: (props: any) =>
    cn(newDisabled(props), newFocus(props), newInputContainer(props)),
  input: newInput,
  // input: cva([
  // 'utils-input',
  // inputContainer,
  // inputDisabled,
  // inputInvalid,
  // 'focus:util-focus-ring outline-none',
  // inputReadOnly,
  // 'h-input',
  // 'placeholder:text-placeholder',
  // '[&[type=file]]:cursor-pointer [&[type=file]]:border-solid [&[type=file]]:bg-background [&[type=file]]:p-0 [&[type=file]]:pr-3 [&[type=file]]:italic [&[type=file]]:text-muted-foreground/70',
  // 'file:cursor-pointer file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground',
  // 'group-[[data-icon]]/input:pl-8',
  // 'group-[[data-action]]/input:pr-7',
  // ]),
  icon: cva([
    'pointer-events-none left-2',
    'text-muted-foreground disabled:text-disabled-foreground',
  ]),
  action: cva(['text-muted-foreground pr-1']),
};
