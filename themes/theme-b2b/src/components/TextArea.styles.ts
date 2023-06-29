import { ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'text-text-primary font-body leading-8',
  'border-border-light rounded-sm border outline-none',
  'px-2 py-0',
  'hover:border-border-hover',
  'focus:border-border-focus focus:shadow-[0_0_0_1px_#fa8005]',
  'disabled:bg-bg-disabled disabled:text-text-disabled disabled:hover:border-border-disabled disabled:border-border-disabled disabled:cursor-not-allowed',
  'group-error/field:border-border-error group-error/field:shadow-[0_0_0_1px_#dd4142]',
]);
