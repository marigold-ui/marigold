import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = {
  container: cva([
    'inline-flex w-full',
    'surface shadow-elevation-base',
    'disabled:state-disabled',
    'group-read-only/field:state-readonly',
    'has-invalid:surface-has-error',
    'has-focus:state-focus',
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
