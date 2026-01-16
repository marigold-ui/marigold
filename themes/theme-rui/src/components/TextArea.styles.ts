import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'inline-flex w-full',
  'px-3 py-2',
  'ui-surface',
  'text-foreground placeholder:text-placeholder text-sm',
  'disabled:ui-state-disabled',
  'group-read-only/field:ui-state-readonly',
  'invalid:ui-state-error',
  'focus:ui-state-focus outline-none',
]);
