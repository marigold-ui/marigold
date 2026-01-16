import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'inline-flex w-full',
  'px-3 py-2',
  'ui-surface shadow-elevation-base',
  'text-foreground placeholder:text-placeholder text-sm',
  'disabled:ui-state-disabled',
  'focus:ui-state-focus outline-none',
  'group-read-only/field:ui-state-readonly group-read-only/field:cursor-default',
  'invalid:ui-surface-has-error',
]);
