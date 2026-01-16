import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = {
  container: cva([
    'inline-flex w-full',
    'ui-surface shadow-elevation-base',
    'disabled:ui-state-disabled',
    'group-read-only/field:ui-state-readonly',
    'has-invalid:ui-surface-has-error',
    'has-focus:ui-state-focus',
  ]),
  textarea: cva([
    'w-full min-w-0',
    'px-3 py-2',
    'bg-transparent',
    'outline-none',
    'text-foreground placeholder:text-placeholder text-sm',
    'rounded-[inherit]',
    'group-read-only/field:cursor-default',
  ]),
};
