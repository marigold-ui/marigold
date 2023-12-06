import { ThemeComponent, cva } from '@marigold/system';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  'border-border-neutral rounded-sm border bg-white',
  'p-0.5',
  'focus:outline-outline-focus -outline-offset-1 focus:outline focus:outline-2',
  'disabled:bg-bg-inverted-disabled',
]);
