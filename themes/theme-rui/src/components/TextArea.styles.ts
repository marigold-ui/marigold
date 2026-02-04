import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva({
  base: [
    'inline-flex',
    'ui-surface ui-input h-[initial]',
    'disabled:ui-state-disabled',
    'group-read-only/field:ui-state-readonly',
    'invalid:ui-state-error',
    'focus:ui-state-focus outline-none',
  ],
});
