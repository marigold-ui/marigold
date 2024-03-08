import { ThemeComponent, cva } from '@marigold/system';

import { inputDisabled } from './Input.styles';

export const TextArea: ThemeComponent<'TextArea'> = cva([
  inputDisabled,
  'border-border-inverted rounded-sm border bg-white',
  'p-0.5',
  'focus:outline-outline-focus -outline-offset-1 focus:outline focus:outline-2',
  'disabled:bg-bg-inverted-disabled',
  'read-only:bg-transparent',
  'resize-y',
]);
