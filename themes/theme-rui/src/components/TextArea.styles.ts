import { type ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = {
  container: cva([
    'relative flex w-full',
    'disabled:state-disabled',
    'group-read-only/field:state-readonly',
  ]),
  textarea: cva([
    'surface has-default-state:elevation-raised rounded-[inherit]',
    'w-full min-w-0',
    'px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)]',
    'text-foreground placeholder:text-placeholder text-sm',
    'outline-none',
    'group-read-only/field:cursor-default',
    'has-invalid:surface-has-error',
    'has-focus:state-focus',
  ]),
};
