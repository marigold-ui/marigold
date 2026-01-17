import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'inline-flex',
  'ui-surface ui-input',
  'disabled:ui-state-disabled',
  'group-read-only/field:ui-state-readonly',
  'invalid:ui-state-error',
  'focus:ui-state-focus outline-none',
]);
